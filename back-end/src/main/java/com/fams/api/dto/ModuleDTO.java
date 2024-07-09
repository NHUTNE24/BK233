package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class ModuleDTO {
    private String id;
    private String moduleName;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;

    private List<String> trainingProgramCode;
}