package com.fams.api.services;

import com.fams.api.entity.DeliveryType;
import com.fams.api.repository.DeliveryTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryTypeService {

    private final DeliveryTypeRepository deliveryTypeRepository;

    @Autowired
    public DeliveryTypeService(DeliveryTypeRepository deliveryTypeRepository) {
        this.deliveryTypeRepository = deliveryTypeRepository;
    }

    public DeliveryType create(DeliveryType deliveryType) {
        return deliveryTypeRepository.insert(deliveryType);
    }

    public DeliveryType findById(String id) {
        Optional<DeliveryType> item = deliveryTypeRepository.findById(id);
        if (item.isPresent()) {
            return item.get();
        } else {
            throw new RuntimeException("DeliveryType not found with id " + id);
        }
    }

    public List<DeliveryType> findAll() {
        return deliveryTypeRepository.findAll();
    }

    public DeliveryType update(String id, DeliveryType updatedDeliveryType) {
        return deliveryTypeRepository.findById(id).map(deliveryType -> {
            if (updatedDeliveryType.getName() != null) deliveryType.setName(updatedDeliveryType.getName());
            if (updatedDeliveryType.getIcon() != null) deliveryType.setIcon(updatedDeliveryType.getIcon());
            if (updatedDeliveryType.getDescription() != null) deliveryType.setDescription(updatedDeliveryType.getDescription());
            return deliveryTypeRepository.save(deliveryType);
        }).orElseThrow(() -> new RuntimeException("DeliveryType not found with id " + id));
    }

    public String delete(String id) {
        if (deliveryTypeRepository.findById(id).isPresent()) {
            deliveryTypeRepository.deleteById(id);
            return "Delete successful";
        } else {
            throw new RuntimeException("DeliveryType not found with id " + id);
        }
    }

    public String deleteAll() {
        deliveryTypeRepository.deleteAll();
        return "Delete all items of DeliveryType";
    }

}
