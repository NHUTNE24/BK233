package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class TrainingMaterialDto {

    private String trainingMaterialId;
    private String createdBy;
    private Date createdDate;
    private boolean isDeleted;
    private String modifiedBy;
    private Date modifiedDate;
    private String fileName;
    private boolean isFile;
    private String name;
    private String url;
    private String unitChapterId;
}