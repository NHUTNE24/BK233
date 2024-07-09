package com.fams.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.fams.api.entity.Class;
import com.fams.api.dto.ClassDTO;

@Mapper
public interface ClassMapper {
    ClassMapper INSTANCE = Mappers.getMapper(ClassMapper.class);

    ClassDTO toDTO(Class classEntity);

    Class toEntity(ClassDTO classDTO);
}
