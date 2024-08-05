package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "training_material")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingMaterial {
    @Id
    private String trainingMaterialId;
    private String createdBy;
    private LocalDateTime createdDate;
    private boolean isDeleted;
    private String modifiedBy;
    private LocalDateTime modifiedDate;
    private String fileName;
    private boolean isFile;
    private String name;
    private String url;
    private String unitChapterId;
}