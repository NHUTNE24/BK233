package com.fams.api.repository;

import com.fams.api.entity.TrainingMaterial;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TrainingMaterialRepository extends MongoRepository<TrainingMaterial, String> {
  List<TrainingMaterial> findByUnitChapterId(String chapterId);
}
