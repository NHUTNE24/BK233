package com.fams.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class SyllabusDTO {
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
  private Float hours;
  private String status;
  private List<String> outputStandards;
}
