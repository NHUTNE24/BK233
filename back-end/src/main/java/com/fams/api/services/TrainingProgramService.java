package com.fams.api.services;

import com.fams.api.entity.TrainingProgram;
import com.fams.api.entity.TrainingProgramSyllabus;
import com.fams.api.repository.TrainingProgramRepository;
import com.fams.api.repository.TrainingProgramSyllabusRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingProgramSyllabusRepository trainingProgramSyllabusRepository;
    @Autowired
    private SyllabusServices syllabusServices;

    @Autowired
    public TrainingProgramService(TrainingProgramRepository trainingProgramRepository, TrainingProgramSyllabusRepository trainingProgramSyllabusRepository) {
        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingProgramSyllabusRepository = trainingProgramSyllabusRepository;
    }

    // Get all training programs
    public List<TrainingProgram> getAllTrainingPrograms() {
        return trainingProgramRepository.findAll();
    }

    // Add a training program
    public TrainingProgram addTrainingProgram(TrainingProgram trainingProgram) {
        for (String syllabusId : trainingProgram.getSyllabusId()) {
            TrainingProgramSyllabus trainingProgramSyllabus = new TrainingProgramSyllabus();
            trainingProgramSyllabus.setProgramId(trainingProgram.getTrainingProgramCode());
            trainingProgramSyllabus.setSyllabusId(syllabusId);
            trainingProgramSyllabusRepository.save(trainingProgramSyllabus);
        }
        return trainingProgramRepository.save(trainingProgram);
    }

    // Update an existing training program
    public TrainingProgram updateTrainingProgram(String trainingProgramCode, TrainingProgram updatedTrainingProgram) {
        return trainingProgramRepository.findById(trainingProgramCode)
                .map(existingTrainingProgram -> {
                    if (updatedTrainingProgram.getCreatedBy() != null)
                        existingTrainingProgram.setCreatedBy(updatedTrainingProgram.getCreatedBy());
                    if (updatedTrainingProgram.getCreatedDate() != null)
                        existingTrainingProgram.setCreatedDate(updatedTrainingProgram.getCreatedDate());
                    if (updatedTrainingProgram.getModifiedBy() != null)
                        existingTrainingProgram.setModifiedBy(updatedTrainingProgram.getModifiedBy());
                    if (updatedTrainingProgram.getModifiedDate() != null)
                        existingTrainingProgram.setModifiedDate(updatedTrainingProgram.getModifiedDate());
                    if (updatedTrainingProgram.getDays() != null)
                        existingTrainingProgram.setDays(updatedTrainingProgram.getDays());
                    if (updatedTrainingProgram.getHours() != null)
                        existingTrainingProgram.setHours(updatedTrainingProgram.getHours());
                    if (updatedTrainingProgram.getStartTime() != null)
                        existingTrainingProgram.setStartTime(updatedTrainingProgram.getStartTime());
                    if (updatedTrainingProgram.getName() != null)
                        existingTrainingProgram.setName(updatedTrainingProgram.getName());
                    if (updatedTrainingProgram.getStatus() != null)
                        existingTrainingProgram.setStatus(updatedTrainingProgram.getStatus());
                    if (updatedTrainingProgram.getUserId() != null)
                        existingTrainingProgram.setUserId(updatedTrainingProgram.getUserId());
                    if (updatedTrainingProgram.getTechnicalCodeId() != null)
                        existingTrainingProgram.setTechnicalCodeId(updatedTrainingProgram.getTechnicalCodeId());
                    if (updatedTrainingProgram.getTechnicalGroupId() != null)
                        existingTrainingProgram.setTechnicalGroupId(updatedTrainingProgram.getTechnicalGroupId());
                    if (updatedTrainingProgram.getModuleId() != null)
                        existingTrainingProgram.setModuleId(updatedTrainingProgram.getModuleId());
                    if (updatedTrainingProgram.getSyllabusId() != null)
                        existingTrainingProgram.setSyllabusId(updatedTrainingProgram.getSyllabusId());

                    if (updatedTrainingProgram.getSyllabusId() != null) {
                        for (String syllabusId : updatedTrainingProgram.getSyllabusId()) {
                            TrainingProgramSyllabus trainingProgramSyllabus = new TrainingProgramSyllabus();
                            trainingProgramSyllabus.setProgramId(updatedTrainingProgram.getTrainingProgramCode());
                            trainingProgramSyllabus.setSyllabusId(syllabusId);
                            trainingProgramSyllabusRepository.save(trainingProgramSyllabus);
                        }
                    }

                    return trainingProgramRepository.save(existingTrainingProgram);
                }).orElseThrow(() -> new RuntimeException("TrainingProgram not found with id " + trainingProgramCode));
    }

    // Delete a training program by ID
    public void deleteTrainingProgram(String trainingProgramCode) {
        trainingProgramRepository.deleteById(trainingProgramCode);
        trainingProgramSyllabusRepository.deleteByProgramId(trainingProgramCode);
    }

    // Get a specific training program by ID
    public TrainingProgram getTrainingProgramById(String trainingProgramCode) {
        Optional<TrainingProgram> trainingProgram = trainingProgramRepository.findById(trainingProgramCode);
        if (trainingProgram.isPresent()) {
            return trainingProgram.get();
        } else {
            throw new RuntimeException("TrainingProgram not found with id " + trainingProgramCode);
        }
    }

    // Activate a program by ID
    public TrainingProgram activateTrainingProgram(String trainingProgramCode, String username) {
        return trainingProgramRepository.findById(trainingProgramCode)
                .map(trainingProgram -> {
                    trainingProgram.setStatus("Active");
                    trainingProgram.setModifiedBy(username);
                    trainingProgram.setModifiedDate(new Date());
                    return trainingProgramRepository.save(trainingProgram);
                }).orElseThrow(() -> new RuntimeException("TrainingProgram not found with id " + trainingProgramCode));
    }

    // Deactivate a program by ID
    public TrainingProgram deactivateTrainingProgram(String trainingProgramCode, String username) {
        return trainingProgramRepository.findById(trainingProgramCode)
                .map(trainingProgram -> {
                    trainingProgram.setStatus("Inactive");
                    trainingProgram.setModifiedBy(username);
                    trainingProgram.setModifiedDate(new Date());
                    return trainingProgramRepository.save(trainingProgram);
                }).orElseThrow(() -> new RuntimeException("TrainingProgram not found with id " + trainingProgramCode));
    }

    // Duplicate a training program by ID
    public TrainingProgram duplicateTrainingProgram(String trainingProgramCode, String username) {
        return trainingProgramRepository.findById(trainingProgramCode)
                .map(existingProgram -> {
                    TrainingProgram duplicatedProgram = new TrainingProgram();
                    duplicatedProgram.setCreatedBy(username);
                    duplicatedProgram.setCreatedDate(new Date());
                    duplicatedProgram.setModifiedBy(username);
                    duplicatedProgram.setModifiedDate(new Date());
                    duplicatedProgram.setDays(existingProgram.getDays());
                    duplicatedProgram.setHours(existingProgram.getHours());
                    duplicatedProgram.setStartTime(existingProgram.getStartTime());
                    duplicatedProgram.setName(existingProgram.getName() + " (Copy)");
                    duplicatedProgram.setStatus("Inactive");
                    duplicatedProgram.setUserId(existingProgram.getUserId());
                    duplicatedProgram.setTechnicalCodeId(existingProgram.getTechnicalCodeId());
                    duplicatedProgram.setTechnicalGroupId(existingProgram.getTechnicalGroupId());
                    duplicatedProgram.setModuleId(existingProgram.getModuleId());
                    duplicatedProgram.setSyllabusId(existingProgram.getSyllabusId());
                    return trainingProgramRepository.save(duplicatedProgram);
                }).orElseThrow(() -> new RuntimeException("TrainingProgram not found with id " + trainingProgramCode));
    }

    // Get all training materials
    public String getAllTrainingMaterials(String trainingProgramCode) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return trainingProgramRepository.findById(trainingProgramCode).map(trainingProgram -> {
                List<Object> trainingMaterialList = new ArrayList<>();
                for (String syllabusId : trainingProgram.getSyllabusId()) {
                    try {
                        trainingMaterialList.add(objectMapper.readValue(syllabusServices.getAllTrainingMaterials(syllabusId), Object.class));
                    } catch (JsonProcessingException e) {
                        System.out.println(e.getMessage());
                    }
                }

                Map<String, Object> result = new HashMap<>();
                result.put("name", trainingProgram.getName());
                result.put("trainingMaterialHierarchy", trainingMaterialList);

                try {
                    return objectMapper.writeValueAsString(result);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                    return "";
                }
            }).orElseThrow(() -> new RuntimeException("Id not found" + trainingProgramCode));
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return "";
        }
    }
}
