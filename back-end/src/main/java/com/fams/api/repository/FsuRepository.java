package com.fams.api.repository;

import com.fams.api.entity.Fsu;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FsuRepository extends MongoRepository<Fsu, String> {
    Optional<Fsu> findById(String fsuId);
}
