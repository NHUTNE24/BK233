package com.fams.api.controller;

import com.fams.api.entity.TrainingProgram;
import com.fams.api.services.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-programs")
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
    public TrainingProgram activateTrainingProgram(@PathVariable String trainingProgramCode, @RequestBody TrainingProgram activatedTrainingProgram) {
        return trainingProgramService.activateTrainingProgram(trainingProgramCode);
    }

    // Deactivate a training program
    @PutMapping("/{trainingProgramCode}/deactivate")
    public TrainingProgram deactivateTrainingProgram(@PathVariable String trainingProgramCode, @RequestBody TrainingProgram deactivatedTrainingProgram) {
        return trainingProgramService.deactivateTrainingProgram(trainingProgramCode);
    }
}