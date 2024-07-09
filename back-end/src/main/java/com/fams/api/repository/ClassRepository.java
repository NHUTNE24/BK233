package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.fams.api.entity.Class;

@Repository
public interface ClassRepository extends MongoRepository<Class, String> {
}
