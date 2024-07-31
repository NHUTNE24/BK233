package com.fams.api.repository;

import com.fams.api.entity.DeliveryType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryTypeRepository extends MongoRepository<DeliveryType, String> {
}
