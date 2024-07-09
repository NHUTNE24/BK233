package com.fams.api.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

import java.time.LocalDateTime;

@Document(collection = "reserved_class")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservedClass {
    @Id
    private String id; 
    private String studentId; 
    private String classId; 
    private String reason; 
    private LocalDateTime startDate; 
    private LocalDateTime endDate; 
}
