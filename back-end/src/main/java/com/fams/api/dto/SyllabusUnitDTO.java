package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Date;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SyllabusUnitDTO {
    private String id;
    private String created_by;
    private Date created_date;
    private Boolean is_deleted;
    private String modified_by;
    private Date modified_date;
    private Integer duration;
    private String name;
    private Integer unit_no;
}
