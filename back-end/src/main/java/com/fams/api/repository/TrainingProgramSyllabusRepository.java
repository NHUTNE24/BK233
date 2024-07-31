package com.fams.api.repository;

import com.fams.api.entity.TrainingProgramSyllabus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainingProgramSyllabusRepository extends MongoRepository<TrainingProgramSyllabus, String> {
    Optional<List<TrainingProgramSyllabus>> findByProgramId(String programId);
    Optional<List<TrainingProgramSyllabus>> findBySyllabusId(String syllabusId);
    void deleteByProgramId(String programId);
    void deleteBySyllabusId(String syllabusId);
}
