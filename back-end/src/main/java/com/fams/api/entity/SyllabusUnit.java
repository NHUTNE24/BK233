package com.fams.api.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;

@Document(collection = "syllabus_unit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusUnit {
    @Id
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
