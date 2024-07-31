package com.fams.api.repository;

import com.fams.api.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findById(String adminId);
}
