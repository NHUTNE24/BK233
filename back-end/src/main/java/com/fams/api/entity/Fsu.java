package com.fams.api.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "fsu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fsu {
    @Id
    private String id; 
    private String name; 
}
