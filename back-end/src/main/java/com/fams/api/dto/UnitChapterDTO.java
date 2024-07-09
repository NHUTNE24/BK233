package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class UnitChapterDTO {
    private String id;
    private String createdBy;
    private Date createdDate;
    private boolean isDeleted;
    private String modifiedBy;
    private Date modifiedDate;
    private int chapterNo;
    private int duration;
    private boolean isOnline;
    private String name;
    private String deliveryTypeId;
    private String outputStandardId;
    private String syllabusUnitId;
}