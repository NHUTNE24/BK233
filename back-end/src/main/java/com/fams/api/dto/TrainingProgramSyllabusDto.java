package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class TrainingProgramSyllabusDto {
    private String id; 
    private String programId;
    private String syllabusId;
}