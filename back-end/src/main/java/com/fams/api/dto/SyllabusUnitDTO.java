package com.fams.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SyllabusUnitDTO {
    private String id;
    private String createdBy;
    private String createdDate;
    private Boolean isDeleted;
    private String modifiedBy;
    private String modifiedDate;
    private Float duration;
    private String name;
    private Integer unitNo;
    private String syllabusDayId;
}
