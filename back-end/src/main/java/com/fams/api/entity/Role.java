package com.fams.api.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Permission getSyllabusPermission() {
        return syllabusPermission;
    }

    public void setSyllabusPermission(Permission syllabusPermission) {
        this.syllabusPermission = syllabusPermission;
    }

    public Permission getTrainingProgramPermission() {
        return trainingProgramPermission;
    }

    public void setTrainingProgramPermission(Permission trainingProgramPermission) {
        this.trainingProgramPermission = trainingProgramPermission;
    }

    public Permission getClassPermission() {
        return classPermission;
    }

    public void setClassPermission(Permission classPermission) {
        this.classPermission = classPermission;
    }

    public Permission getLearningMaterialPermission() {
        return learningMaterialPermission;
    }

    public void setLearningMaterialPermission(Permission learningMaterialPermission) {
        this.learningMaterialPermission = learningMaterialPermission;
    }

    public Permission getUserPermission() {
        return userPermission;
    }

    public void setUserPermission(Permission userPermission) {
        this.userPermission = userPermission;
    }
}
