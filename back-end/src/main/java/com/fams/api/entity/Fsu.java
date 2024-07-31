package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fsu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fsu {
    @Id
    private String id; 
    private String name; 
}
