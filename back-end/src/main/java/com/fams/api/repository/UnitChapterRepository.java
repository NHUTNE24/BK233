package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fams.api.entity.UnitChapter;

@Repository
public interface UnitChapterRepository extends MongoRepository<UnitChapter, String>{
    
}
