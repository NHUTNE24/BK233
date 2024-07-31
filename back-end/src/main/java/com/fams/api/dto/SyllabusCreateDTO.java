package com.fams.api.dto;

import com.fams.api.dto.createData.BasicInfo;
import com.fams.api.dto.createData.DayCreate;
import com.fams.api.dto.createData.GeneralInfo;
import com.fams.api.entity.AssignmentSchema;
import com.fams.api.entity.TrainingDeliveryPrinciple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class SyllabusCreateDTO {
    String userName;
    List<DayCreate> syllabusDay;
    AssignmentSchema assignmentSchema;
    BasicInfo basicInfo;
    GeneralInfo general;
    TrainingDeliveryPrinciple trainingPrinciple;
    Boolean isSyllabusDaysValid;
    Boolean isAssessmentSchemaValid;
    Boolean isBasicInfoValid;
    Boolean isGeneralValid;
    Boolean isTrainingPrincipleValid;
    String status;
}
