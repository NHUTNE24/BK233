package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.fams.api.entity.TrainingProgram;

public interface  TrainingProgramRepository extends MongoRepository<TrainingProgram, String> {

}