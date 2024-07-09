package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fams.api.entity.Module;

@Repository
public interface ModuleRepository extends MongoRepository<Module, String>{
    
}
