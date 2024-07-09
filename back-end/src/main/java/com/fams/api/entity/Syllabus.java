package com.fams.api.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "syllabus")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Syllabus {
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
