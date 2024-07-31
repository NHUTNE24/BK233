package com.fams.api.services;

import com.fams.api.entity.AssignmentSchema;
import com.fams.api.repository.AssignmentSchemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentSchemaService {

    private final AssignmentSchemaRepository assignmentSchemaRepository;

    @Autowired
    public AssignmentSchemaService(AssignmentSchemaRepository assignmentSchemaRepository) {
        this.assignmentSchemaRepository = assignmentSchemaRepository;
    }

    public AssignmentSchema create(AssignmentSchema assignmentSchema) {
        if (assignmentSchema.getAssignment() == null) assignmentSchema.setAssignment(0F);
        if (assignmentSchema.getGpa() == null) assignmentSchema.setGpa(0F);
        if (assignmentSchema.getFinalAssessment() == null) assignmentSchema.setFinalAssessment(0F);
        if (assignmentSchema.getFinalTheory() == null) assignmentSchema.setFinalTheory(0F);
        if (assignmentSchema.getFinalPractice() == null) assignmentSchema.setFinalPractice(0F);
        if (assignmentSchema.getQuiz() == null) assignmentSchema.setQuiz(0F);
        if (assignmentSchema.getSyllabusId() == null)
            throw new RuntimeException("Cannot create hanging Assignment Schema");
        return assignmentSchemaRepository.insert(assignmentSchema);
    }

    public AssignmentSchema findById(String id) {
        Optional<AssignmentSchema> item = assignmentSchemaRepository.findById(id);
        if (item.isPresent()) {
            return item.get();
        } else {
            throw new RuntimeException("AssignmentSchema not found with id " + id);
        }
    }

    public AssignmentSchema findBySyllabusId(String id) {
        Optional<AssignmentSchema> item = assignmentSchemaRepository.findBySyllabusId(id);
        if (item.isPresent()) {
            return item.get();
        } else {
            throw new RuntimeException("AssignmentSchema not found with id " + id);
        }
    }

    public List<AssignmentSchema> findAll() {
        return assignmentSchemaRepository.findAll();
    }
    
    public AssignmentSchema update(String id, AssignmentSchema updatedAssignmentSchema) {
        return assignmentSchemaRepository.findById(id).map(assignmentSchema -> {
            if (updatedAssignmentSchema.getAssignment() != null) assignmentSchema.setAssignment(updatedAssignmentSchema.getAssignment());
            if (updatedAssignmentSchema.getGpa() != null) assignmentSchema.setGpa(updatedAssignmentSchema.getGpa());
            if (updatedAssignmentSchema.getFinalAssessment() != null) assignmentSchema.setFinalAssessment(updatedAssignmentSchema.getFinalAssessment());
            if (updatedAssignmentSchema.getFinalTheory() != null) assignmentSchema.setFinalTheory(updatedAssignmentSchema.getFinalTheory());
            if (updatedAssignmentSchema.getFinalPractice() != null) assignmentSchema.setFinalPractice(updatedAssignmentSchema.getFinalPractice());
            if (updatedAssignmentSchema.getQuiz() != null) assignmentSchema.setQuiz(updatedAssignmentSchema.getQuiz());
            if (updatedAssignmentSchema.getSyllabusId() != null) assignmentSchema.setSyllabusId(updatedAssignmentSchema.getSyllabusId());
            return assignmentSchemaRepository.save(assignmentSchema);
        }).orElseThrow(() -> new RuntimeException("AssignmentSchema not found with id " + id));
    }

    public String delete(String id) {
        if (assignmentSchemaRepository.findById(id).isPresent()) {
            assignmentSchemaRepository.deleteById(id);
            return "Delete successful";
        } else {
            throw new RuntimeException("AssignmentSchema not found with id " + id);
        }
    }

    public String deleteAll() {
        assignmentSchemaRepository.deleteAll();
        return "Delete all items of AssignmentSchema";
    }
    
}
