package com.fams.api.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fams.api.entity.Module;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

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

