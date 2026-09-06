package com.marketplace.backend.repository;

import com.marketplace.backend.entity.SellerProfile;
import com.marketplace.backend.entity.User;
import com.marketplace.backend.enums.SellerStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SellerProfileRepository extends JpaRepository<SellerProfile,Long> {


    Optional<SellerProfile> findByUser(User user);

    List<SellerProfile> findByStatus(SellerStatus status);

    Optional<SellerProfile> findByUserEmail(String email);

}
