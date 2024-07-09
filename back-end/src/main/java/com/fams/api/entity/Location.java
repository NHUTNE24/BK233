package com.fams.api.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "location")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    @Id
    private String id; 
    private String address;
    private String name; 
}
