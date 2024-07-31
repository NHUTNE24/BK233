package com.fams.api.repository;

import com.fams.api.entity.UnitChapter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitChapterRepository extends MongoRepository<UnitChapter, String>{
    Optional<List<UnitChapter>> findBySyllabusUnitId(String id);
}
