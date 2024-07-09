package com.fams.api.mapper;

import org.mapstruct.Mapper;

import com.fams.api.dto.ModuleDTO;
import com.fams.api.entity.Module;

@Mapper(componentModel = "spring")
public interface ModuleMapper {
  Module toEntity(ModuleDTO moduleDTO);
  ModuleDTO toDTO(Module module); 
}