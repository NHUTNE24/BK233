package com.fams.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TrainingProgramDetailDTO {
    private String trainingProgramCode;
    private String createdBy;
    private Date createdDate;
    private String modifiedBy;
    private Date modifiedDate;
    private int days;
    private int hours;
    private String name;
    private String status;
    private String userId;
    private String technicalCodeId;
    private String technicalGroupId;
    private List<String> moduleId;
    private List<String> syllabusId;
    private List<SyllabusDTO> syllabi;
}