package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;

import java.util.*;
import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class TrainingProgramDto {
    @Id
    private String trainingProgramCode;
    private String createdBy;
    private Date createdDate;
    private String modifiedBy;
    private Date modifiedDate;
    private int days;
    private int hours;
    private Time startTime;
    private String name;
    private String status;
    
    private String userId;
    private String technicalCodeId;
    private String technicalGroupId;
    private List<String> moduleId;
    private List<String> syllabusId;
}