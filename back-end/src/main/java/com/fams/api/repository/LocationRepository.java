package com.fams.api.repository;

import com.fams.api.entity.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends MongoRepository<Location, String> {
    Optional<Location> findById(String locationId);
}
