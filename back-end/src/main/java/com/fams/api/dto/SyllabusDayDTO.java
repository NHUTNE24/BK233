package com.fams.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class SyllabusDayDTO {
  private String id;
  private String createdBy;
  private String createdDate;
  private Boolean isDeleted;
  private String modifiedBy;
  private String modifiedDate;
  private Integer dayNo;
  private String syllabusId;
}
