package com.fams.api.entity;

import java.sql.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "syllabus_day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusDay {
  @Id  
  private String id;
  private String created_by;
  private Date created_date;
  private Boolean is_deleted;
  private String modified_by;
  private Date modified_date;
  private Integer day_no;
  private String syllabus_id;
}
