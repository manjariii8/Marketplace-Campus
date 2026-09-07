package com.marketplace.backend.repository;

import com.marketplace.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {

    // =========================
    // CUSTOMER / PUBLIC
    // =========================

    List<Product> findByActiveTrue();

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
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable
    );

    // =========================
    // PRODUCT BY ID
    // =========================

    Optional<Product> findByIdAndSellerId(
            Long id,
            Long sellerId
    );

    // =========================
    // SEARCH
    // =========================

    List<Product> findByNameContainingIgnoreCase(
            String keyword
    );

    List<Product> findByCategoryId(
            Long categoryId
    );

    // =========================
    // SELLER PRODUCTS
    // =========================

    List<Product> findBySeller_Id(
            Long sellerId
    );

    List<Product> findBySeller_IdAndActiveTrue(
            Long sellerId
    );

    // =========================
    // COUNTS
    // =========================

    long count();

    long countByCategoryId(
            Long categoryId
    );

    long countBySeller_Id(
            Long sellerId
    );

    long countBySeller_IdAndActiveTrue(
            Long sellerId
    );
    long countByActiveTrue();
}