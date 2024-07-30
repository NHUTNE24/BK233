package com.fams.api.services;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.fams.api.entity.TrainingProgram;
import com.fams.api.repository.TrainingProgramRepository;

@Service
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;


    public TrainingProgramService(TrainingProgramRepository trainingProgramRepository) {
        this.trainingProgramRepository = trainingProgramRepository;

    }

    // Get all training programs
    public List<TrainingProgram> getAllTrainingPrograms() {
        return trainingProgramRepository.findAll();
    }

    // Add a training program
    public TrainingProgram addTrainingProgram(TrainingProgram trainingProgram) {
            return trainingProgramRepository.save(trainingProgram);
    }

    // Update an existing training program
    public TrainingProgram updateTrainingProgram(String trainingProgramCode, TrainingProgram updatedTrainingProgram) {
        return trainingProgramRepository.findById(trainingProgramCode)
            .map(existingTrainingProgram -> {
                if (updatedTrainingProgram.getCreatedBy() != null) existingTrainingProgram.setCreatedBy(updatedTrainingProgram.getCreatedBy());
                if (updatedTrainingProgram.getCreatedDate() != null) existingTrainingProgram.setCreatedDate(updatedTrainingProgram.getCreatedDate());
                if (updatedTrainingProgram.getModifiedBy() != null) existingTrainingProgram.setModifiedBy(updatedTrainingProgram.getModifiedBy());
                if (updatedTrainingProgram.getModifiedDate() != null) existingTrainingProgram.setModifiedDate(updatedTrainingProgram.getModifiedDate());
                if (updatedTrainingProgram.getDays() != null) existingTrainingProgram.setDays(updatedTrainingProgram.getDays());
                if (updatedTrainingProgram.getHours() != null) existingTrainingProgram.setHours(updatedTrainingProgram.getHours());
                if (updatedTrainingProgram.getStartTime() != null) existingTrainingProgram.setStartTime(updatedTrainingProgram.getStartTime());
                if (updatedTrainingProgram.getName() != null) existingTrainingProgram.setName(updatedTrainingProgram.getName());
                if (updatedTrainingProgram.getStatus() != null) existingTrainingProgram.setStatus(updatedTrainingProgram.getStatus());
                if (updatedTrainingProgram.getUserId() != null) existingTrainingProgram.setUserId(updatedTrainingProgram.getUserId());
                if (updatedTrainingProgram.getTechnicalCodeId() != null) existingTrainingProgram.setTechnicalCodeId(updatedTrainingProgram.getTechnicalCodeId());
                if (updatedTrainingProgram.getTechnicalGroupId() != null) existingTrainingProgram.setTechnicalGroupId(updatedTrainingProgram.getTechnicalGroupId());
                return trainingProgramRepository.save(existingTrainingProgram);
            }).orElseThrow(() -> new RuntimeException("TrainingProgram not found with id " + trainingProgramCode));
    }

    // Delete a training program by ID
    public void deleteTrainingProgram(String trainingProgramCode) {
        trainingProgramRepository.deleteById(trainingProgramCode);
    }

    // Get a specific training program by ID
    public TrainingProgram getTrainingProgramById(String trainingProgramCode) {
        Optional<TrainingProgram> trainingProgram = trainingProgramRepository.findById(trainingProgramCode);
        if(trainingProgram.isPresent()) {
            return trainingProgram.get();
        } else {
            throw new RuntimeException("TrainingProgram not found with id " + trainingProgramCode);
        }
    }


    // Activate a program by ID
    public TrainingProgram activateTrainingProgram(String trainingProgramCode) {
        return trainingProgramRepository.findById(trainingProgramCode)
                .map(trainingProgram -> {
                    trainingProgram.setStatus("active"); 
                    return trainingProgramRepository.save(trainingProgram); 
                }).orElseThrow(() -> new RuntimeException("TrainingProgram not found with id " + trainingProgramCode));
    }

    // Deactivate a program by ID
    public TrainingProgram deactivateTrainingProgram(String trainingProgramCode) {
        return trainingProgramRepository.findById(trainingProgramCode)
                .map(trainingProgram -> {
                    trainingProgram.setStatus("inactive"); 
                    return trainingProgramRepository.save(trainingProgram); 
                }).orElseThrow(() -> new RuntimeException("TrainingProgram not found with id " + trainingProgramCode));
    }
}