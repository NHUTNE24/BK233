package com.fams.api.mapper;

import org.mapstruct.Mapper;

import com.fams.api.dto.SyllabusDTO;
import com.fams.api.entity.Syllabus;

@Mapper(componentModel = "spring")
public interface SyllabusMapper {
  Syllabus toEntity(SyllabusDTO syllabusDTO);
  SyllabusDTO toDTO(Syllabus syllabus);
}
