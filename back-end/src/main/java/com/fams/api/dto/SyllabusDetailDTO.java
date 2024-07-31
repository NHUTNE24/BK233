package com.fams.api.dto;

import com.fams.api.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class SyllabusDetailDTO {
    private Syllabus syllabus;
    private String userName;
    private List<SyllabusDay> syllabusDays;
    private List<List<SyllabusUnit>> syllabusUnits;
    private List<List<UnitChapter>> unitChapters;
    private AssignmentSchema assignmentSchema;
    private List<OutputStandard> outputStandards;
    private List<DeliveryType> deliveryTypes;
    private TrainingDeliveryPrinciple trainingDeliveryPrinciple;
}
