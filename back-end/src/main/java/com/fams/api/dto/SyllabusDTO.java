package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class SyllabusDTO {
  private String id;
  private String topic_code;
  private String topic_name;
  private String version;
  private String created_by;
  private String created_date;
  private String modified_by;
  private String modified_date;
  private Integer attendee_number;
  private List<String> level;
  private String technical_requirement;
  private String couse_objective;
  private Integer delivery_principle;
  private Integer days;
  private float hours;

  private List<String> trainingProgramCode;
}
