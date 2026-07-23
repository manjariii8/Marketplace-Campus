package com.marketplace.backend.repository;

import com.marketplace.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product,Long>,
        JpaSpecificationExecutor<Product> {

    List<Product> findByActiveTrue();

    Optional<Product> findByIdAndSellerId(Long id, Long sellerId);

    Page<Product> findByActiveTrue(Pageable pageable);

    Page<Product> findByActiveTrueAndNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    Page<Product> findByActiveTrueAndCategoryId(
            Long categoryId,
            Pageable pageable
    );

    Page<Product> findByActiveTrueAndPriceBetween(
            java.math.BigDecimal minPrice,
            java.math.BigDecimal maxPrice,
            Pageable pageable
    );
}
