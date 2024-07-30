package com.fams.api.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    @NonNull
    private String name;

    @DBRef
    private Permission syllabusPermission;

    @DBRef
    private Permission trainingProgramPermission;

    @DBRef
    private Permission classPermission;

    @DBRef
    private Permission learningMaterialPermission;

    @DBRef
    private Permission userPermission;
}
