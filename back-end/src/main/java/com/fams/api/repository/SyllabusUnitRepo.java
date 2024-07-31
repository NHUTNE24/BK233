package com.fams.api.repository;

import com.fams.api.entity.SyllabusUnit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SyllabusUnitRepo extends MongoRepository<SyllabusUnit, String> {
    Optional<List<SyllabusUnit>> findBySyllabusDayId(String id);
}
