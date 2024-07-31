package com.fams.api.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "modules")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class Module {
    private String id;
    private String moduleName;
    private String createdDate;
    private String createdBy;
    private String updatedDate;
    private String updatedBy;

    private List<String> trainingProgramCode;
}

