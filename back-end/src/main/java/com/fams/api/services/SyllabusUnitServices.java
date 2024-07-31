package com.fams.api.services;

import com.fams.api.dto.SyllabusUnitDTO;
import com.fams.api.entity.SyllabusUnit;
import com.fams.api.entity.UnitChapter;
import com.fams.api.mapper.SyllabusUnitMapper;
import com.fams.api.repository.SyllabusUnitRepo;
import com.fams.api.repository.UnitChapterRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class SyllabusUnitServices implements BaseServices<SyllabusUnitDTO>{
    private SyllabusUnitRepo syllabusUnitRepo;
    private UnitChapterRepository unitChapterRepository;
    private final SyllabusUnitMapper syllabusUnitMapper;
    private UnitChapterService unitChapterService;

    @Override
    public SyllabusUnitDTO create(SyllabusUnitDTO syllabusUnitDTO) {
        SyllabusUnit syllabusUnit = syllabusUnitMapper.toEntity(syllabusUnitDTO);
        SyllabusUnit savedSyllabus = syllabusUnitRepo.insert(syllabusUnit);
        SyllabusUnitDTO savedSyllabusDTO = syllabusUnitMapper.toDTO(savedSyllabus);
        return savedSyllabusDTO;
    }

    @Override
    public List<SyllabusUnitDTO> findAll() {
        List<SyllabusUnit> syllabusUnit = syllabusUnitRepo.findAll();
        return syllabusUnit.stream().map(syllabusUnitMapper::toDTO).toList();
    }

    @Override
    public SyllabusUnitDTO findByID(String id) {
        Optional<SyllabusUnit> syllabusUnitToFind = syllabusUnitRepo.findById(id);
        if (syllabusUnitToFind.isPresent())
        {
            SyllabusUnit result = syllabusUnitToFind.get();
            return syllabusUnitMapper.toDTO(result);
        }
        else {
            throw new RuntimeException("Syllabus Unit not found with id " + id);
        }
    }

    @Override
    public SyllabusUnitDTO update(SyllabusUnitDTO syllabusUnitDTO) {
        Optional<SyllabusUnit> syllabusUnitFound = syllabusUnitRepo.findById(syllabusUnitDTO.getId());

        if (!syllabusUnitFound.isPresent()) {
            throw new RuntimeException("Syllabus Day not found with id " + syllabusUnitDTO.getId());
        }

        SyllabusUnit syllabusUnitToUpdate = syllabusUnitFound.get();

        if (syllabusUnitDTO.getId() != null) {
            syllabusUnitToUpdate.setId(syllabusUnitDTO.getId());
        }
        if (syllabusUnitDTO.getCreatedBy() != null) {
            syllabusUnitToUpdate.setCreatedBy(syllabusUnitDTO.getCreatedBy());
        }
        if (syllabusUnitDTO.getCreatedDate() != null) {
            syllabusUnitToUpdate.setCreatedDate(syllabusUnitDTO.getCreatedDate());
        }
        if (syllabusUnitDTO.getModifiedBy() != null) {
            syllabusUnitToUpdate.setModifiedBy(syllabusUnitDTO.getModifiedBy());
        }
        if (syllabusUnitDTO.getModifiedDate() != null) {
            syllabusUnitToUpdate.setModifiedDate(syllabusUnitDTO.getModifiedDate());
        }
        if (syllabusUnitDTO.getIsDeleted() != null) {
            syllabusUnitToUpdate.setIsDeleted(syllabusUnitDTO.getIsDeleted());
        }
        if (syllabusUnitDTO.getUnitNo() != null) {
            syllabusUnitToUpdate.setUnitNo(syllabusUnitDTO.getUnitNo());
        }
        if (syllabusUnitDTO.getDuration() != null) {
            syllabusUnitToUpdate.setDuration(syllabusUnitDTO.getDuration());
        }
        if (syllabusUnitDTO.getSyllabusDayId() != null) {
            syllabusUnitToUpdate.setSyllabusDayId(syllabusUnitDTO.getSyllabusDayId());
        }

        SyllabusUnit updatedSyllabusUnit = syllabusUnitRepo.save(syllabusUnitToUpdate);
        return syllabusUnitMapper.toDTO(updatedSyllabusUnit);
    }

    @Override
    public void delete(String id) {
        syllabusUnitRepo.deleteById(id);
    }

    @Override
    public void deleteAll() {
        syllabusUnitRepo.deleteAll();
    }

    public List<SyllabusUnitDTO> findBySyllabusDayID(String id) {
        Optional<List<SyllabusUnit>> syllabusUnitToFind = syllabusUnitRepo.findBySyllabusDayId(id);
        if (syllabusUnitToFind.isPresent())
        {
            List<SyllabusUnit> syllabusUnitList = syllabusUnitToFind.get();
            return syllabusUnitList.stream().map(syllabusUnitMapper::toDTO).toList();
        }
        else {
            return null;
        }
    }

    // Get all training materials
    public String getAllTrainingMaterials(String syllabusUnitId) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return syllabusUnitRepo.findById(syllabusUnitId).map(syllabusUnit -> {
                List<Object> trainingMaterialList = new ArrayList<>();
                List<UnitChapter> unitChapters = unitChapterRepository.findBySyllabusUnitId(syllabusUnitId).get();
                for (UnitChapter chapter : unitChapters) {
                    try {
                        trainingMaterialList.add(objectMapper.readValue(unitChapterService.getAllTrainingMaterials(chapter.getId()), Object.class));
                    } catch (JsonProcessingException e) {
                        System.out.println(e.getMessage());
                    }
                }

                Map<String, Object> result = new HashMap<>();
                result.put("name", syllabusUnit.getName());
                result.put("trainingMaterialHierarchy", trainingMaterialList);

                try {
                    return objectMapper.writeValueAsString(result);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                    return "";
                }
            }).orElseThrow(() -> new RuntimeException("Id not found" + syllabusUnitId));
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return "";
        }
    }
}
