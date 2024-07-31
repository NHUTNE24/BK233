package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "syllabus")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Syllabus {
  @Id
  private String id;

  private String topicCode;
  private String topicName;
  private String version;
  private String createdBy;
  private String createdDate;
  private String modifiedBy;
  private String modifiedDate;
  private Integer attendeeNumber;
  private String level;
  private String technicalRequirement;
  private String courseObjective;
  private Integer days;
  private float hours;
  private String status;
  private List<String> outputStandards;
}
