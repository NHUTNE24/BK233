package com.fams.api.mapper;

import com.fams.api.dto.SyllabusUnitDTO;
import com.fams.api.entity.SyllabusUnit;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SyllabusUnitMapper {
    SyllabusUnit toEntity(SyllabusUnitDTO syllabusUnitDTO);
    SyllabusUnitDTO toDTO(SyllabusUnit syllabusUnit);
}
