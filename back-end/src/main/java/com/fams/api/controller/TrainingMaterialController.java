package com.fams.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.fams.api.entity.TrainingMaterial;
import com.fams.api.services.TrainingMaterialService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/training-materials")
public class TrainingMaterialController {

    private final TrainingMaterialService trainingMaterialService;
    private final Path rootLocation = Paths.get("uploads");
    public TrainingMaterialController(TrainingMaterialService trainingMaterialService) {
        this.trainingMaterialService = trainingMaterialService;
    }

    // Get all training materials
    @GetMapping
    public List<TrainingMaterial> getAllTrainingMaterials() {
        return trainingMaterialService.getAllTrainingMaterials();
    }

    // Add a training material

    @PostMapping("/upload/{chapterId}")
    public ResponseEntity<TrainingMaterial> uploadFile( @PathVariable String chapterId, @RequestParam("file") MultipartFile file) {
        TrainingMaterial uploadedFile = trainingMaterialService.addTrainingMaterial(file, chapterId);
        return ResponseEntity.ok(uploadedFile);
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

    @GetMapping("/by-chapter/{unitChapterId}")
    public List<TrainingMaterial> getTrainingMaterialByChapterId(@PathVariable String unitChapterId) {
        return trainingMaterialService.getTrainingMaterialByChapter(unitChapterId);
    }
}