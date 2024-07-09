package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fams.api.entity.OutputStandard;

@Repository
public interface OutputStandardRepository extends MongoRepository<OutputStandard, String>{

}
