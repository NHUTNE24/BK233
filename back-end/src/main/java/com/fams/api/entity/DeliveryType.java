package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "delivery-type")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryType {
    @Id
    private String id;

    private String description;
    private String icon;
    private String name;
}
