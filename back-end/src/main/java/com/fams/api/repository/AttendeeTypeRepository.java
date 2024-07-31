package com.fams.api.repository;

import com.fams.api.entity.AttendeeType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AttendeeTypeRepository extends MongoRepository<AttendeeType, String> {
    Optional<AttendeeType> findById(String attendeeTypeId);
}
