package com.fams.api.repository;

import com.fams.api.entity.SyllabusDay;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SyllabusDayRepo extends MongoRepository<SyllabusDay, String> {
}
