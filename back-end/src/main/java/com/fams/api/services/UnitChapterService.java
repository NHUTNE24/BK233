package com.fams.api.services;

import com.fams.api.entity.TrainingMaterial;
import com.fams.api.entity.UnitChapter;
import com.fams.api.repository.OutputStandardRepository;
import com.fams.api.repository.SyllabusUnitRepo;
import com.fams.api.repository.TrainingMaterialRepository;
import com.fams.api.repository.UnitChapterRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UnitChapterService {
    private final UnitChapterRepository unitChapterRepository;
    private final OutputStandardRepository outputStandardRepository;
    private final SyllabusUnitRepo syllabusUnitRepository;
    private final TrainingMaterialRepository trainingMaterialRepository;

    @Autowired
    public UnitChapterService(UnitChapterRepository unitChapterRepository, OutputStandardRepository outputStandardRepository, SyllabusUnitRepo syllabusUnitRepository, TrainingMaterialRepository trainingMaterialRepository) {
        this.unitChapterRepository = unitChapterRepository;
        this.outputStandardRepository = outputStandardRepository;
        this.syllabusUnitRepository = syllabusUnitRepository;
        this.trainingMaterialRepository = trainingMaterialRepository;
    }

    //Get all unit chapters
    public List<UnitChapter> getAllUnitChapters() {
        return unitChapterRepository.findAll();
    }

    //Add a unit chapter
    public UnitChapter addUnitChapter(UnitChapter unitChapter) {
        if (unitChapter.getOutputStandardId() != null && !unitChapter.getOutputStandardId().isEmpty()) {
            if (!outputStandardRepository.existsById(unitChapter.getOutputStandardId())) {
                throw new RuntimeException("Output Standard not found with id " + unitChapter.getOutputStandardId());
            }
        }
        if (unitChapter.getSyllabusUnitId() != null && !unitChapter.getSyllabusUnitId().isEmpty()) {
            if (!syllabusUnitRepository.existsById(unitChapter.getSyllabusUnitId())) {
                throw new RuntimeException("Syllabus Unit not found with id " + unitChapter.getSyllabusUnitId());
            }
        }
        return unitChapterRepository.insert(unitChapter);
    }

    //Update an existing unit chapter
    public UnitChapter updateUnitChapter(String id, UnitChapter updatedUnitChapter) {
        return unitChapterRepository.findById(id).map(unitChapter -> {
            if (updatedUnitChapter.getCreatedBy() != null) unitChapter.setCreatedBy(updatedUnitChapter.getCreatedBy());
            if (updatedUnitChapter.getCreatedDate() != null)
                unitChapter.setCreatedDate(updatedUnitChapter.getCreatedDate());
            if (updatedUnitChapter.getIsDeleted() != null) unitChapter.setIsDeleted(updatedUnitChapter.getIsDeleted());
            if (updatedUnitChapter.getModifiedBy() != null)
                unitChapter.setModifiedBy(updatedUnitChapter.getModifiedBy());
            if (updatedUnitChapter.getModifiedDate() != null)
                unitChapter.setModifiedDate(updatedUnitChapter.getModifiedDate());
            if (updatedUnitChapter.getName() != null) unitChapter.setName(updatedUnitChapter.getName());
            if (updatedUnitChapter.getChapterNo() != 0) unitChapter.setChapterNo(updatedUnitChapter.getChapterNo());
            if (updatedUnitChapter.getDuration() != 0) unitChapter.setDuration(updatedUnitChapter.getDuration());
            if (updatedUnitChapter.getIsOnline() != null) unitChapter.setIsOnline(updatedUnitChapter.getIsOnline());
            if (updatedUnitChapter.getSyllabusUnitId() != null) {
                unitChapter.setSyllabusUnitId(updatedUnitChapter.getSyllabusUnitId());
            }
            if (updatedUnitChapter.getOutputStandardId() != null) {
                unitChapter.setOutputStandardId(updatedUnitChapter.getOutputStandardId());
            }
            if (updatedUnitChapter.getTrainingMaterialId() != null)
                unitChapter.setTrainingMaterialId(updatedUnitChapter.getTrainingMaterialId());
            return unitChapterRepository.save(unitChapter);
        }).orElseThrow(() -> new RuntimeException("Unit chapter not found with id " + id));
    }

    //Delete a unit chapter by id
    public void deleteUnitChapter(String id) {
        if (unitChapterRepository.findById(id).isPresent())
            unitChapterRepository.deleteById(id);
        else throw new RuntimeException("Unit chapter not found with id " + id);
    }

    //Get a specific unit chapter by id
    public UnitChapter getUnitChapterById(String id) {
        Optional<UnitChapter> unitChapter = unitChapterRepository.findById(id);
        if (unitChapter.isPresent()) {
            return unitChapter.get();
        } else {
            throw new RuntimeException("Unit chapter not found with id " + id);
        }
    }

    // Get all training materials
    public String getAllTrainingMaterials(String unitChapterId) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return unitChapterRepository.findById(unitChapterId).map(unitChapter -> {
                List<TrainingMaterial> trainingMaterialList = new ArrayList<>();
                if (unitChapter.getTrainingMaterialId() == null)
                    unitChapter.setTrainingMaterialId(Collections.emptyList());
                for (String trainingMaterialId : unitChapter.getTrainingMaterialId())
                    try {
                        trainingMaterialList.add(trainingMaterialRepository.findById(trainingMaterialId).orElseThrow(() -> new RuntimeException("Id not found" + trainingMaterialId)));
                    } catch (RuntimeException e) {
                        System.out.println(e.getMessage());
                    }

                Map<String, Object> result = new HashMap<>();
                result.put("name", unitChapter.getName());
                result.put("trainingMaterialHierarchy", trainingMaterialList);

                try {
                    return objectMapper.writeValueAsString(result);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                    return "";
                }
            }).orElseThrow(() -> new RuntimeException("Id not found" + unitChapterId));
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return "";
        }
    }
}
