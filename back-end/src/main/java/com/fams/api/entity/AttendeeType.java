package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "attendeeType")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendeeType {
    @Id
    // private String id;
    private String attendeeTypeId;
    private String description;
    private String attendeeTypeName;
}
