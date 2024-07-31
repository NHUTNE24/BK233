package com.fams.api.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "unit_chapters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class UnitChapter {
    private String id;
    private String createdBy;
    private String createdDate;
    private Boolean isDeleted;
    private String modifiedBy;
    private String modifiedDate;
    private int chapterNo;
    private int duration;
    private Boolean isOnline;
    private String name;
    private String deliveryTypeId;
    private String outputStandardId;
    private String syllabusUnitId;
    private List<String> trainingMaterialId;
}