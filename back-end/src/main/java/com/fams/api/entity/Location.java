package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
