package com.fams.api.mapper;

import com.fams.api.dto.TrainingProgramDto;
import com.fams.api.entity.TrainingProgram;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrainingProgramMapper {
    TrainingProgram toEntity(TrainingProgramDto trainingProgramDto);
    TrainingProgramDto toDTO(TrainingProgram trainingProgram);
}
