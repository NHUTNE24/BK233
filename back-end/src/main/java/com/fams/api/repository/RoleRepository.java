package com.fams.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fams.api.entity.Role;

public interface RoleRepository extends MongoRepository<Role, String> {

}
