package com.fams.api.services;

import com.fams.api.dto.SyllabusDTO;
import com.fams.api.entity.AssignmentSchema;
import com.fams.api.entity.Syllabus;
import com.fams.api.entity.SyllabusDay;
import com.fams.api.entity.TrainingDeliveryPrinciple;
import com.fams.api.mapper.SyllabusMapper;
import com.fams.api.repository.SyllabusDayRepo;
import com.fams.api.repository.SyllabusRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class SyllabusServices implements BaseServices<SyllabusDTO> {
  private SyllabusRepository syllabusRepository;
  private final SyllabusDayRepo syllabusDayRepo;
  private final SyllabusMapper syllabusMapper;
  private final TrainingDeliveryPrincipleService trainingDeliveryPrincipleService;
  private final AssignmentSchemaService assignmentSchemaService;
  private SyllabusDayServices syllabusDayServices;

  @Override
  public SyllabusDTO create(SyllabusDTO syllabusDTO) {
    Syllabus syllabus = syllabusMapper.toEntity(syllabusDTO);
    if (syllabusDTO.getDays() == null) syllabus.setDays(0);
    if (syllabusDTO.getHours() == null) syllabus.setHours(0);
    if (syllabusDTO.getAttendeeNumber() == null) syllabus.setAttendeeNumber(0);
    syllabus.setOutputStandards(new ArrayList<>());

    Syllabus savedSyllabus = syllabusRepository.insert(syllabus);

    AssignmentSchema assignmentSchema = new AssignmentSchema();
    assignmentSchema.setSyllabusId(savedSyllabus.getId());
    assignmentSchemaService.create(assignmentSchema);

    TrainingDeliveryPrinciple trainingDeliveryPrinciple = new TrainingDeliveryPrinciple();
    trainingDeliveryPrinciple.setSyllabusId(savedSyllabus.getId());
    trainingDeliveryPrincipleService.create(trainingDeliveryPrinciple);

    return syllabusMapper.toDTO(savedSyllabus);
  }

  @Override
  public List<SyllabusDTO> findAll() {
    List<Syllabus> syllabi = syllabusRepository.findAll();
    return syllabi.stream().map(syllabusMapper::toDTO).toList();
  }

  @Override
  public SyllabusDTO findByID(String id) {
    Optional<Syllabus> syllabusToFind = syllabusRepository.findById(id);
    if (syllabusToFind.isPresent())
    return syllabusMapper.toDTO(syllabusToFind.get());
    else throw new RuntimeException("Syllabus not found with id " + id);
  }

  @Override
  public SyllabusDTO update(SyllabusDTO syllabusDTO) {
    Syllabus syllabusToUpdate = syllabusRepository.findById(syllabusDTO.getId()).get();

    if (syllabusDTO.getId() != null) {
      syllabusToUpdate.setId(syllabusDTO.getId());
    }
    if (syllabusDTO.getTopicCode() != null) {
      syllabusToUpdate.setTopicCode(syllabusDTO.getTopicCode());
    }
    if (syllabusDTO.getTopicName() != null) {
      syllabusToUpdate.setTopicName(syllabusDTO.getTopicName());
    }
    if (syllabusDTO.getVersion() != null) {
      syllabusToUpdate.setVersion(syllabusDTO.getVersion());
    }
    if (syllabusDTO.getCreatedBy() != null) {
      syllabusToUpdate.setCreatedBy(syllabusDTO.getCreatedBy());
    }
    if (syllabusDTO.getCreatedDate() != null) {
      syllabusToUpdate.setCreatedDate(syllabusDTO.getCreatedDate());
    }
    if (syllabusDTO.getModifiedBy() != null) {
      syllabusToUpdate.setModifiedBy(syllabusDTO.getModifiedBy());
    }
    if (syllabusDTO.getModifiedDate() != null) {
      syllabusToUpdate.setModifiedDate(syllabusDTO.getModifiedDate());
    }
    if (syllabusDTO.getAttendeeNumber() != null) {
      syllabusToUpdate.setAttendeeNumber(syllabusDTO.getAttendeeNumber());
    }
    if (syllabusDTO.getLevel() != null) {
      syllabusToUpdate.setLevel(syllabusDTO.getLevel());
    }
    if (syllabusDTO.getTechnicalRequirement() != null) {
      syllabusToUpdate.setTechnicalRequirement(syllabusDTO.getTechnicalRequirement());
    }
    if (syllabusDTO.getCourseObjective() != null) {
      syllabusToUpdate.setCourseObjective(syllabusDTO.getCourseObjective());
    }
    if (syllabusDTO.getDays() != null) {
      syllabusToUpdate.setDays(syllabusDTO.getDays());
    }
    if (syllabusDTO.getHours() != 0) {
      syllabusToUpdate.setHours(syllabusDTO.getHours());
    }
    if (syllabusDTO.getStatus() != null) {
      syllabusToUpdate.setStatus(syllabusDTO.getStatus());
    }
    if (syllabusDTO.getOutputStandards() != null) {
      syllabusToUpdate.setOutputStandards(syllabusDTO.getOutputStandards());
    }

    Syllabus updatedSyllabus = syllabusRepository.save(syllabusToUpdate);
    return syllabusMapper.toDTO(updatedSyllabus);
  }

  @Override
  public void delete(String id) {
    syllabusRepository.deleteById(id);
  }

  @Override
  public void deleteAll() {
    syllabusRepository.deleteAll();
  }

  // Get all training materials
  public String getAllTrainingMaterials(String syllabusId) {
    ObjectMapper objectMapper = new ObjectMapper();

    try {
      return syllabusRepository.findById(syllabusId).map(syllabus -> {
        List<Object> trainingMaterialList = new ArrayList<>();

        Optional<List<SyllabusDay>> syllabusDay = syllabusDayRepo.findBySyllabusId(syllabusId);
        List<SyllabusDay> dayList = syllabusDay.get();

        for (SyllabusDay day : dayList) {
          try {
            String syllabusDayId = day.getId();
            trainingMaterialList.add(objectMapper.readValue(syllabusDayServices.getAllTrainingMaterials(syllabusDayId), Object.class));
          } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
          }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("name", syllabus.getTopicName());
        result.put("trainingMaterialHierarchy", trainingMaterialList);

        try {
          return objectMapper.writeValueAsString(result);
        } catch (JsonProcessingException e) {
          System.out.println(e.getMessage());
          return "";
        }
      }).orElseThrow(() -> new RuntimeException("Id not found" + syllabusId));
    } catch (RuntimeException e) {
      System.out.println(e.getMessage());
      return "";
    }
  }
}
