package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fams.api.entity.Permission;

public interface PermissionRepository extends MongoRepository<Permission, String> {
    
}
