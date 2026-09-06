package com.marketplace.backend.repository;

import com.marketplace.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    Optional<Category> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);

    List<Category> findByNameContainingIgnoreCase(String keyword);

    @Query("""
        SELECT COUNT(p)
        FROM Product p
        WHERE p.category.id = :categoryId
    """)
    long countProductsByCategoryId(
            @Param("categoryId") Long categoryId
    );

}
