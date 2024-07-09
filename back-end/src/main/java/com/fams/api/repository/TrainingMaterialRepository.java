package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.fams.api.entity.TrainingMaterial;

public interface  TrainingMaterialRepository extends MongoRepository<TrainingMaterial, String> {
    
}