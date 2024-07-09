package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class SyllabusDayDTO {
  private String id;
  private String created_by;
  private Date created_date;
  private Boolean is_deleted;
  private String modified_by;
  private Date modified_date;
  private Integer day_no;
  private String syllabus_id;
}
