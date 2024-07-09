package com.fams.api.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

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
    private boolean isDeleted;
    private String modifiedBy;
    private String modifiedDate;
    private int chapterNo;
    private int duration;
    private boolean isOnline;
    private String name;
    private String deliveryTypeId;
    private String outputStandardId;
    private String syllabusUnitId;
}