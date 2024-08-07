package com.fams.api.repository;

import com.fams.api.entity.Syllabus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SyllabusRepository extends MongoRepository<Syllabus, String> {
    Optional<List<Syllabus>> findByTopicCode(String topicCode);
    Optional<List<Syllabus>> findByTopicName(String topicName);
    Optional<List<Syllabus>> findByTopicCodeAndTopicName(String topicCode, String topicName);
    List<Syllabus> findAllByIdIn(List<String> syllabusId);
}