package com.fams.api.repository;

import com.fams.api.entity.SyllabusUnit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SyllabusUnitRepo extends MongoRepository<SyllabusUnit, String> {
}
