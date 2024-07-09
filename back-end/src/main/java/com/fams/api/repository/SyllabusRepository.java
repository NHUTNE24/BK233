package com.fams.api.repository;

import com.fams.api.entity.Syllabus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SyllabusRepository extends MongoRepository<Syllabus, String> {
}