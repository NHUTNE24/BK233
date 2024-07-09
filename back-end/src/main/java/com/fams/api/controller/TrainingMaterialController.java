package com.fams.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.fams.api.entity.TrainingMaterial;
import com.fams.api.services.TrainingMaterialService;

@RestController
@RequestMapping("/api/training-materials")
public class TrainingMaterialController {

    private final TrainingMaterialService trainingMaterialService;

    @Autowired
    public TrainingMaterialController(TrainingMaterialService trainingMaterialService) {
        this.trainingMaterialService = trainingMaterialService;
    }

    // Get all training materials
    @GetMapping
    public List<TrainingMaterial> getAllTrainingMaterials() {
        return trainingMaterialService.getAllTrainingMaterials();
    }

    // Add a training material
    @PostMapping
    public TrainingMaterial addTrainingMaterial(@RequestBody TrainingMaterial trainingMaterial) {
        return trainingMaterialService.addTrainingMaterial(trainingMaterial);
    }

    // Update an existing training material
    @PutMapping("/{trainingMaterialId}")
    public TrainingMaterial updateTrainingMaterial(@PathVariable String trainingMaterialId, @RequestBody TrainingMaterial updatedTrainingMaterial) {
        return trainingMaterialService.updateTrainingMaterial(trainingMaterialId, updatedTrainingMaterial);
    }

    // Delete a training material by ID
    @DeleteMapping("/{trainingMaterialId}")
    public void deleteTrainingMaterial(@PathVariable String trainingMaterialId) {
        trainingMaterialService.deleteTrainingMaterial(trainingMaterialId);
    }

    // Get a specific training material by ID
    @GetMapping("/{trainingMaterialId}")
    public TrainingMaterial getTrainingMaterialById(@PathVariable String trainingMaterialId) {
        return trainingMaterialService.getTrainingMaterialById(trainingMaterialId);
    }
}