package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "training_program_syllabus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingProgramSyllabus {
    @Id
    private String id;
    private String programId;
    private String syllabusId;
}