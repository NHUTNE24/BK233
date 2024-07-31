package com.fams.api.repository;

import com.fams.api.entity.AssignmentSchema;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssignmentSchemaRepository extends MongoRepository<AssignmentSchema, String> {
    Optional<AssignmentSchema> findBySyllabusId(String id);
}
