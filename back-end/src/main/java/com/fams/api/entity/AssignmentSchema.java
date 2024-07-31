package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "assignment_schema")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentSchema {
    @Id
    private String id;

    private Float assignment;
    private Float finalPractice;
    private Float finalAssessment;
    private Float finalTheory;
    private Float gpa;
    private Float quiz;
    private String syllabusId;
}
