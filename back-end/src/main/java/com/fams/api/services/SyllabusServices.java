package com.fams.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fams.api.dto.SyllabusDTO;
import com.fams.api.entity.Syllabus;
import com.fams.api.mapper.SyllabusMapper;
import com.fams.api.repository.SyllabusRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SyllabusServices implements BaseServices<SyllabusDTO> {
  private SyllabusRepository syllabusRepository;
  private final SyllabusMapper syllabusMapper;

  @Override
  public SyllabusDTO create(SyllabusDTO syllabusDTO) {
    Syllabus syllabus = syllabusMapper.toEntity(syllabusDTO);
    Syllabus savedSyllabus = syllabusRepository.insert(syllabus);
    SyllabusDTO savedSyllabusDTO = syllabusMapper.toDTO(savedSyllabus);
    return savedSyllabusDTO;
  }

  @Override
  public List<SyllabusDTO> findAll() {
    List<Syllabus> syllabi = syllabusRepository.findAll();
    return syllabi.stream().map(syllabusMapper::toDTO).toList();
  }

  @Override
  public SyllabusDTO findByID(String id) {
    Optional<Syllabus> syllabusToFind = syllabusRepository.findById(id);
    Syllabus syllabus = syllabusToFind.get();
    return syllabusMapper.toDTO(syllabus);
  }

  @Override
  public SyllabusDTO update(SyllabusDTO syllabusDTO) {
    Syllabus syllabusToUpdate = syllabusRepository.findById(syllabusDTO.getId()).get();

    if (syllabusDTO.getId() != null) {
      syllabusToUpdate.setId(syllabusDTO.getId());
    }
    if (syllabusDTO.getTopic_code() != null) {
      syllabusToUpdate.setTopic_code(syllabusDTO.getTopic_code());
    }
    if (syllabusDTO.getTopic_name() != null) {
      syllabusToUpdate.setTopic_name(syllabusDTO.getTopic_name());
    }
    if (syllabusDTO.getVersion() != null) {
      syllabusToUpdate.setVersion(syllabusDTO.getVersion());
    }
    if (syllabusDTO.getCreated_by() != null) {
      syllabusToUpdate.setCreated_by(syllabusDTO.getCreated_by());
    }
    if (syllabusDTO.getCreated_date() != null) {
      syllabusToUpdate.setCreated_date(syllabusDTO.getCreated_date());
    }
    if (syllabusDTO.getModified_by() != null) {
      syllabusToUpdate.setModified_by(syllabusDTO.getModified_by());
    }
    if (syllabusDTO.getModified_date() != null) {
      syllabusToUpdate.setModified_date(syllabusDTO.getModified_date());
    }
    if (syllabusDTO.getAttendee_number() != null) {
      syllabusToUpdate.setAttendee_number(syllabusDTO.getAttendee_number());
    }
    if (syllabusDTO.getLevel() != null) {
      syllabusToUpdate.setLevel(syllabusDTO.getLevel());
    }
    if (syllabusDTO.getTechnical_requirement() != null) {
      syllabusToUpdate.setTechnical_requirement(syllabusDTO.getTechnical_requirement());
    }
    if (syllabusDTO.getCouse_objective() != null) {
      syllabusToUpdate.setCouse_objective(syllabusDTO.getCouse_objective());
    }
    if (syllabusDTO.getDelivery_principle() != null) {
      syllabusToUpdate.setDelivery_principle(syllabusDTO.getDelivery_principle());
    }
    if (syllabusDTO.getDays() != null) {
      syllabusToUpdate.setDays(syllabusDTO.getDays());
    }
    if (syllabusDTO.getHours() != 0) {
      syllabusToUpdate.setHours(syllabusDTO.getHours());
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
}
