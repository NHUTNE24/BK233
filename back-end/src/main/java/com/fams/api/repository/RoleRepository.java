package com.fams.api.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fams.api.entity.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(String roleName);
}
