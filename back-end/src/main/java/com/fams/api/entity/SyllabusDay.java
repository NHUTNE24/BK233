package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "syllabus_day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusDay {
  @Id  
  private String id;
  private String createdBy;
  private String createdDate;
  private Boolean isDeleted;
  private String modifiedBy;
  private String modifiedDate;
  private Integer dayNo;
  private String syllabusId;
}
