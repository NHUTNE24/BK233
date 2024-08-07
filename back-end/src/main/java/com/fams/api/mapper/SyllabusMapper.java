package com.fams.api.mapper;

import com.fams.api.dto.SyllabusDTO;
import com.fams.api.entity.Syllabus;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SyllabusMapper {
  SyllabusMapper INSTANCE = Mappers.getMapper(SyllabusMapper.class);
  Syllabus toEntity(SyllabusDTO syllabusDTO);
  SyllabusDTO toDTO(Syllabus syllabus);
}
