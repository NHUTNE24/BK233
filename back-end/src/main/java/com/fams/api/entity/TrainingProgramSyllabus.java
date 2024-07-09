package com.fams.api.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

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