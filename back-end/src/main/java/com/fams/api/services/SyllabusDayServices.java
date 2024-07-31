package com.fams.api.services;

import com.fams.api.dto.SyllabusDayDTO;
import com.fams.api.entity.SyllabusDay;
import com.fams.api.entity.SyllabusUnit;
import com.fams.api.mapper.SyllabusDayMapper;
import com.fams.api.repository.SyllabusDayRepo;
import com.fams.api.repository.SyllabusUnitRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class SyllabusDayServices implements BaseServices<SyllabusDayDTO>{
    private SyllabusDayRepo syllabusDayRepo;
    private final SyllabusUnitRepo syllabusUnitRepo;
    private final SyllabusDayMapper syllabusDayMapper;
    private SyllabusUnitServices syllabusUnitServices;

    @Override
    public SyllabusDayDTO create(SyllabusDayDTO syllabusDayDTO) {
        SyllabusDay syllabusDay = syllabusDayMapper.toSyllabusDay(syllabusDayDTO);
        SyllabusDay savedSyllabus = syllabusDayRepo.insert(syllabusDay);
        SyllabusDayDTO savedSyllabusDTO = syllabusDayMapper.toSyllabusDayDTO(savedSyllabus);
        return savedSyllabusDTO;
    }

    @Override
    public List<SyllabusDayDTO> findAll() {
        List<SyllabusDay> syllabusDay = syllabusDayRepo.findAll();
        return syllabusDay.stream().map(syllabusDayMapper::toSyllabusDayDTO).toList();
    }

    @Override
    public SyllabusDayDTO findByID(String id) {
        Optional<SyllabusDay> syllabusDayToFind = syllabusDayRepo.findById(id);
        if (syllabusDayToFind.isPresent())
        {
            SyllabusDay result = syllabusDayToFind.get();
            return syllabusDayMapper.toSyllabusDayDTO(result);
        }
        else {
            throw new RuntimeException("Syllabus Day not found with id " + id);
        }
    }

    @Override
    public SyllabusDayDTO update(SyllabusDayDTO syllabusDayDTO) {
        Optional<SyllabusDay> syllabusDayFound = syllabusDayRepo.findById(syllabusDayDTO.getId());

        if (!syllabusDayFound.isPresent()) {
            throw new RuntimeException("Syllabus Day not found with id " + syllabusDayDTO.getId());
        }

        SyllabusDay syllabusDayToUpdate = syllabusDayFound.get();

        if (syllabusDayDTO.getId() != null) {
            syllabusDayToUpdate.setId(syllabusDayDTO.getId());
        }
        if (syllabusDayDTO.getCreatedBy() != null) {
            syllabusDayToUpdate.setCreatedBy(syllabusDayDTO.getCreatedBy());
        }
        if (syllabusDayDTO.getCreatedDate() != null) {
            syllabusDayToUpdate.setCreatedDate(syllabusDayDTO.getCreatedDate());
        }
        if (syllabusDayDTO.getModifiedBy() != null) {
            syllabusDayToUpdate.setModifiedBy(syllabusDayDTO.getModifiedBy());
        }
        if (syllabusDayDTO.getModifiedDate() != null) {
            syllabusDayToUpdate.setModifiedDate(syllabusDayDTO.getModifiedDate());
        }
        if (syllabusDayDTO.getIsDeleted() != null) {
            syllabusDayToUpdate.setIsDeleted(syllabusDayDTO.getIsDeleted());
        }
        if (syllabusDayDTO.getDayNo() != null) {
            syllabusDayToUpdate.setDayNo(syllabusDayDTO.getDayNo());
        }
        if (syllabusDayDTO.getSyllabusId() != null) {
            syllabusDayToUpdate.setSyllabusId(syllabusDayDTO.getSyllabusId());
        }

        SyllabusDay updatedSyllabusDay = syllabusDayRepo.save(syllabusDayToUpdate);
        return syllabusDayMapper.toSyllabusDayDTO(updatedSyllabusDay);
    }

    @Override
    public void delete(String id) {
        syllabusDayRepo.deleteById(id);
    }

    @Override
    public void deleteAll() {
        syllabusDayRepo.deleteAll();
    }

    public List<SyllabusDayDTO> findBySyllabusID(String id) {
        Optional<List<SyllabusDay>> syllabusDayListFound = syllabusDayRepo.findBySyllabusId(id);

        if (syllabusDayListFound.isPresent()) {
            List<SyllabusDay> syllabusDayList = syllabusDayListFound.get();
            return syllabusDayList.stream().map(syllabusDayMapper::toSyllabusDayDTO).toList();
        } else {
            return null;
        }
    }

    // Get all training materials
    public String getAllTrainingMaterials(String syllabusDayId) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return syllabusDayRepo.findById(syllabusDayId).map(syllabusDay -> {
                List<Object> trainingMaterialList = new ArrayList<>();
                List<SyllabusUnit> syllabusUnits = syllabusUnitRepo.findBySyllabusDayId(syllabusDayId).get();
                for (SyllabusUnit unit : syllabusUnits) {
                    try {
                        trainingMaterialList.add(objectMapper.readValue(syllabusUnitServices.getAllTrainingMaterials(unit.getId()), Object.class));
                    } catch (JsonProcessingException e) {
                        System.out.println(e.getMessage());
                    }
                }

                Map<String, Object> result = new HashMap<>();
                result.put("name", "Day " + syllabusDay.getDayNo());
                result.put("trainingMaterialHierarchy", trainingMaterialList);

                try {
                    return objectMapper.writeValueAsString(result);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                    return "";
                }
            }).orElseThrow(() -> new RuntimeException("Id not found" + syllabusDayId));
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return "";
        }
    }

}
