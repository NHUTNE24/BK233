package com.fams.api.mapper;

import com.fams.api.dto.SyllabusDTO;
import com.fams.api.entity.Syllabus;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SyllabusMapper {
  Syllabus toEntity(SyllabusDTO syllabusDTO);
  SyllabusDTO toDTO(Syllabus syllabus);
}
