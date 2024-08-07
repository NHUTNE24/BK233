package com.fams.api.repository;

import com.fams.api.entity.TrainingProgram;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface  TrainingProgramRepository extends MongoRepository<TrainingProgram, String> {

    List<TrainingProgram> findAllByTrainingProgramCodeIn(List<String> trainingProgramCode);

}