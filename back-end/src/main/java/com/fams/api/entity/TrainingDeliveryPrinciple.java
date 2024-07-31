package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "training_delivery_principle")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingDeliveryPrinciple {
    @Id
    private String id;

    private String syllabusId;
    private String training;
    private String pretest;
    private String marking;
    private String waiverCriteria;
    private String others;
}
