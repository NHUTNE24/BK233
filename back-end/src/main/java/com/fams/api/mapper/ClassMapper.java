package com.fams.api.mapper;

import com.fams.api.dto.ClassDTO;
import com.fams.api.entity.Class;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ClassMapper {
    ClassMapper INSTANCE = Mappers.getMapper(ClassMapper.class);

    ClassDTO toDTO(Class classEntity);

    Class toEntity(ClassDTO classDTO);
}
