package com.fams.api.services;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.fams.api.entity.TrainingMaterial;
import com.fams.api.repository.TrainingMaterialRepository;
import com.fams.api.repository.UnitChapterRepository; 

@Service
public class TrainingMaterialService {

    private final TrainingMaterialRepository trainingMaterialRepository;
    private final UnitChapterRepository unitChapterRepository; 

    
    public TrainingMaterialService(TrainingMaterialRepository trainingMaterialRepository, UnitChapterRepository unitChapterRepository) { // Modify this constructor
        this.trainingMaterialRepository = trainingMaterialRepository;
        this.unitChapterRepository = unitChapterRepository; // Initialize the unitChapterRepository
    }

    // Get all training materials
    public List<TrainingMaterial> getAllTrainingMaterials() {
        return trainingMaterialRepository.findAll();
    }

    // Add a training material 
    public TrainingMaterial addTrainingMaterial(TrainingMaterial trainingMaterial) {
        if (trainingMaterial.getUnitChapterId() != null && !trainingMaterial.getUnitChapterId().isEmpty()) {
            if (!unitChapterRepository.existsById(trainingMaterial.getUnitChapterId())) {
                throw new RuntimeException("UnitChapter not found with id: " + trainingMaterial.getUnitChapterId());
            }
        }
        return trainingMaterialRepository.save(trainingMaterial);
    }

    // Update an existing training material
    public TrainingMaterial updateTrainingMaterial(String trainingMaterialId, TrainingMaterial updatedTrainingMaterial) {
        return trainingMaterialRepository.findById(trainingMaterialId)
                .map(existingTrainingMaterial -> {
                    if (updatedTrainingMaterial.getUnitChapterId() != null && !unitChapterRepository.existsById(updatedTrainingMaterial.getUnitChapterId())) {
                        throw new RuntimeException("UnitChapter not found with id: " + updatedTrainingMaterial.getUnitChapterId());
                    }
                    if (updatedTrainingMaterial.getName() != null) existingTrainingMaterial.setName(updatedTrainingMaterial.getName());
                    if (updatedTrainingMaterial.getFileName() != null) existingTrainingMaterial.setFileName(updatedTrainingMaterial.getFileName());
                    if (updatedTrainingMaterial.getUrl() != null) existingTrainingMaterial.setUrl(updatedTrainingMaterial.getUrl());
                    if (updatedTrainingMaterial.getCreatedBy() != null) existingTrainingMaterial.setCreatedBy(updatedTrainingMaterial.getCreatedBy());
                    if (updatedTrainingMaterial.getCreatedDate() != null) existingTrainingMaterial.setCreatedDate(updatedTrainingMaterial.getCreatedDate());
                    if (updatedTrainingMaterial.getModifiedBy() != null) existingTrainingMaterial.setModifiedBy(updatedTrainingMaterial.getModifiedBy());
                    if (updatedTrainingMaterial.getModifiedDate() != null) existingTrainingMaterial.setModifiedDate(updatedTrainingMaterial.getModifiedDate());
                    existingTrainingMaterial.setDeleted(updatedTrainingMaterial.isDeleted());
                    existingTrainingMaterial.setFile(updatedTrainingMaterial.isFile());
                    if (updatedTrainingMaterial.getUnitChapterId() != null) existingTrainingMaterial.setUnitChapterId(updatedTrainingMaterial.getUnitChapterId());
                    return trainingMaterialRepository.save(existingTrainingMaterial);
                }).orElseThrow(() -> new RuntimeException("TrainingMaterial not found with id " + trainingMaterialId));
    }

    // Delete a training material by ID
    public void deleteTrainingMaterial(String trainingMaterialId) {
        trainingMaterialRepository.deleteById(trainingMaterialId);
    }

    // Get a specific training material by ID
    public TrainingMaterial getTrainingMaterialById(String trainingMaterialId) {
        Optional<TrainingMaterial> trainingMaterial = trainingMaterialRepository.findById(trainingMaterialId);
        if(trainingMaterial.isPresent()) {
            return trainingMaterial.get();
        } else {
            throw new RuntimeException("TrainingMaterial not found with id " + trainingMaterialId);
        }
    }
}