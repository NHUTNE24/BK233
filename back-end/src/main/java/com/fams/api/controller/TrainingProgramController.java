package com.fams.api.controller;

import com.fams.api.entity.TrainingProgram;
import com.fams.api.services.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/training-programs")
@CrossOrigin
public class TrainingProgramController {

    private final TrainingProgramService trainingProgramService;

    @Autowired
    public TrainingProgramController(TrainingProgramService trainingProgramService) {
        this.trainingProgramService = trainingProgramService;
    }

    // Get all training programs
    @GetMapping
    public List<TrainingProgram> getAllTrainingPrograms() {
        return trainingProgramService.getAllTrainingPrograms();
    }

    // Add a training program
    @PostMapping
    public TrainingProgram addTrainingProgram(@RequestBody TrainingProgram trainingMaterial) {
        return trainingProgramService.addTrainingProgram(trainingMaterial);
    }

    // Update an existing training program
    @PutMapping("/{trainingProgramCode}")
    public TrainingProgram updateTrainingProgram(@PathVariable String trainingProgramCode, @RequestBody TrainingProgram updatedTrainingMaterial) {
        return trainingProgramService.updateTrainingProgram(trainingProgramCode, updatedTrainingMaterial);
    }

    // Delete a training program by ID
    @DeleteMapping("/{trainingProgramCode}")
    public void deleteTrainingProgram(@PathVariable String trainingProgramCode) {
        trainingProgramService.deleteTrainingProgram(trainingProgramCode);
    }

    // Get a specific training program by ID
    @GetMapping("/{trainingProgramCode}")
    public TrainingProgram getTrainingProgramById(@PathVariable String trainingProgramCode) {
        return trainingProgramService.getTrainingProgramById(trainingProgramCode);
    }

    // Activate a training program
    @PutMapping("/{trainingProgramCode}/activate")
    public TrainingProgram activateTrainingProgram(@PathVariable String trainingProgramCode, @RequestBody String username) {
        return trainingProgramService.activateTrainingProgram(trainingProgramCode, username);
    }

    // Deactivate a training program
    @PutMapping("/{trainingProgramCode}/deactivate")
    public TrainingProgram deactivateTrainingProgram(@PathVariable String trainingProgramCode, @RequestBody String username) {
        return trainingProgramService.deactivateTrainingProgram(trainingProgramCode, username);
    }

    // Duplicate a training program
    @PostMapping("/{trainingProgramCode}/duplicate")
    public TrainingProgram duplicateTrainingProgram(@PathVariable String trainingProgramCode, @RequestBody String username) {
        return trainingProgramService.duplicateTrainingProgram(trainingProgramCode, username);
    }

    // Get all training materials of a training program
    @GetMapping("/{trainingProgramCode}/getMaterials")
    public String getAllTrainingMaterials(@PathVariable String trainingProgramCode) {
        return trainingProgramService.getAllTrainingMaterials(trainingProgramCode);
    }
}