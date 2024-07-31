package com.fams.api.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "output_standards")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class OutputStandard {
    private String id;
    private String code;
    private String descriptions;
    private String name;
}