package com.fams.api.controller;

import com.fams.api.entity.DeliveryType;
import com.fams.api.services.DeliveryTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/delivery-type")
public class DeliveryTypeController {

    private final DeliveryTypeService deliveryTypeService;

    @Autowired
    public DeliveryTypeController(DeliveryTypeService deliveryTypeService) {
        this.deliveryTypeService = deliveryTypeService;
    }

    @GetMapping
    public ResponseEntity<List<DeliveryType>> getAllDeliveryType() {
        List<DeliveryType> allDeliveryType = deliveryTypeService.findAll();
        return new ResponseEntity<>(allDeliveryType, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DeliveryType> addDeliveryType(@RequestBody DeliveryType deliveryType) {
        DeliveryType newDeliveryType = deliveryTypeService.create(deliveryType);
        return new ResponseEntity<>(newDeliveryType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeliveryType(@PathVariable String id, @RequestBody DeliveryType deliveryType) {
        try {
            DeliveryType updatedDeliveryType = deliveryTypeService.update(id, deliveryType);
            return new ResponseEntity<>(updatedDeliveryType, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //Delete an output standard by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeliveryType(@PathVariable String id) {
        try {
            deliveryTypeService.delete(id);
            return new ResponseEntity<>("DeliveryType has been deleted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //Get an output standard by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveryTypeById(@PathVariable String id) {
        try {
            DeliveryType deliveryType = deliveryTypeService.findById(id);
            return new ResponseEntity<>(deliveryType, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}