package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "syllabus_unit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusUnit {
    @Id
    private String id;
    private String createdBy;
    private String createdDate;
    private Boolean isDeleted;
    private String modifiedBy;
    private String modifiedDate;
    private Float duration;
    private String name;
    private Integer unitNo;
    private String syllabusDayId;
}
