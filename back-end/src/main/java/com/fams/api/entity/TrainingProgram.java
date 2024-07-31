package com.fams.api.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "training_program")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TrainingProgram {
    @Id
    private String trainingProgramCode;
    private String createdBy;
    private Date createdDate;
    private String modifiedBy;
    private Date modifiedDate;
    private Integer days;
    private Integer hours;
    private Date startTime;
    private String name;
    private String status;

    private String userId;
    private String technicalCodeId;
    private String technicalGroupId;
    private List<String> moduleId;
    private List<String> syllabusId;
}