package com.fams.api.repository;

import com.fams.api.entity.TrainingDeliveryPrinciple;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainingDeliveryPrincipleRepository extends MongoRepository<TrainingDeliveryPrinciple, String> {
    Optional<TrainingDeliveryPrinciple> findBySyllabusId(String id);
}
