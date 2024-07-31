package com.fams.api.mapper;

import com.fams.api.dto.TrainingMaterialDto;
import com.fams.api.entity.TrainingMaterial;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrainingMaterialMapper {
    TrainingMaterial toEntity(TrainingMaterialDto trainingMaterialDto);
    TrainingMaterialDto toDTO(TrainingMaterial trainingMaterial);
}
