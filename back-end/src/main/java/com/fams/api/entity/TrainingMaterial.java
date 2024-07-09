package com.fams.api.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;
import java.util.Date;

@Document(collection = "training_material")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingMaterial {
    @Id
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