package com.fams.api.mapper;

import com.fams.api.dto.ModuleDTO;
import com.fams.api.entity.Module;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ModuleMapper {
  Module toEntity(ModuleDTO moduleDTO);
  ModuleDTO toDTO(Module module); 
}