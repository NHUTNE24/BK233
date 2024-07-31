package com.fams.api.services;

import com.fams.api.entity.TrainingDeliveryPrinciple;
import com.fams.api.repository.TrainingDeliveryPrincipleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainingDeliveryPrincipleService {

    private final TrainingDeliveryPrincipleRepository trainingDeliveryPrincipleRepository;

    @Autowired
    public TrainingDeliveryPrincipleService(TrainingDeliveryPrincipleRepository trainingDeliveryPrincipleRepository) {
        this.trainingDeliveryPrincipleRepository = trainingDeliveryPrincipleRepository;
    }

    public TrainingDeliveryPrinciple create(TrainingDeliveryPrinciple trainingDeliveryPrinciple) {
        if (trainingDeliveryPrinciple.getTraining() == null) trainingDeliveryPrinciple.setTraining("");
        if (trainingDeliveryPrinciple.getPretest() == null) trainingDeliveryPrinciple.setPretest("");
        if (trainingDeliveryPrinciple.getMarking() == null) trainingDeliveryPrinciple.setMarking("");
        if (trainingDeliveryPrinciple.getWaiverCriteria() == null) trainingDeliveryPrinciple.setWaiverCriteria("");
        if (trainingDeliveryPrinciple.getOthers() == null) trainingDeliveryPrinciple.setOthers("");
        if (trainingDeliveryPrinciple.getSyllabusId() == null)
            throw new RuntimeException("Cannot create hanging Training Delivery Principle");
        return trainingDeliveryPrincipleRepository.insert(trainingDeliveryPrinciple);
    }

    public TrainingDeliveryPrinciple findById(String id) {
        Optional<TrainingDeliveryPrinciple> item = trainingDeliveryPrincipleRepository.findById(id);
        if (item.isPresent()) {
            return item.get();
        } else {
            throw new RuntimeException("TrainingDeliveryPrinciple not found with id " + id);
        }
    }

    public TrainingDeliveryPrinciple findBySyllabusId(String id) {
        Optional<TrainingDeliveryPrinciple> item = trainingDeliveryPrincipleRepository.findBySyllabusId(id);
        if (item.isPresent()) {
            return item.get();
        } else {
            throw new RuntimeException("TrainingDeliveryPrinciple not found with id " + id);
        }
    }

    public List<TrainingDeliveryPrinciple> findAll() {
        return trainingDeliveryPrincipleRepository.findAll();
    }

    public TrainingDeliveryPrinciple update(String id, TrainingDeliveryPrinciple updatedTrainingDeliveryPrinciple) {
        return trainingDeliveryPrincipleRepository.findById(id).map(trainingDeliveryPrinciple -> {
            if (updatedTrainingDeliveryPrinciple.getTraining() != null) trainingDeliveryPrinciple.setTraining(updatedTrainingDeliveryPrinciple.getTraining());
            if (updatedTrainingDeliveryPrinciple.getPretest() != null) trainingDeliveryPrinciple.setPretest(updatedTrainingDeliveryPrinciple.getPretest());
            if (updatedTrainingDeliveryPrinciple.getMarking() != null) trainingDeliveryPrinciple.setMarking(updatedTrainingDeliveryPrinciple.getMarking());
            if (updatedTrainingDeliveryPrinciple.getWaiverCriteria() != null) trainingDeliveryPrinciple.setWaiverCriteria(updatedTrainingDeliveryPrinciple.getWaiverCriteria());
            if (updatedTrainingDeliveryPrinciple.getOthers() != null) trainingDeliveryPrinciple.setOthers(updatedTrainingDeliveryPrinciple.getOthers());
            return trainingDeliveryPrincipleRepository.save(trainingDeliveryPrinciple);
        }).orElseThrow(() -> new RuntimeException("TrainingDeliveryPrinciple not found with id " + id));
    }

    public String delete(String id) {
        if (trainingDeliveryPrincipleRepository.findById(id).isPresent()) {
            trainingDeliveryPrincipleRepository.deleteById(id);
            return "Delete successful";
        } else {
            throw new RuntimeException("TrainingDeliveryPrinciple not found with id " + id);
        }
    }

    public String deleteAll() {
        trainingDeliveryPrincipleRepository.deleteAll();
        return "Delete all items of TrainingDeliveryPrinciple";
    }

}
