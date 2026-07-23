package com.marketplace.backend.repository;

import com.marketplace.backend.entity.SellerProfile;
import com.marketplace.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerProfileRepository extends JpaRepository<SellerProfile,Long> {


    Optional<SellerProfile> findByUser(User user);
}
