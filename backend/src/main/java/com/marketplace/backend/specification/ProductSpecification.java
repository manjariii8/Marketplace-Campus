package com.marketplace.backend.specification;

import com.marketplace.backend.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public final class ProductSpecification {

    private ProductSpecification() {
    }

    public static Specification<Product> hasKeyword(String keyword) {

        return (root, query, cb) -> {

            if (keyword == null || keyword.isBlank()) {
                return cb.conjunction();
            }

            return cb.like(
                    cb.lower(root.get("name")),
                    "%" + keyword.toLowerCase() + "%"
            );
        };
    }

    public static Specification<Product> hasCategory(Long categoryId) {

        return (root, query, cb) -> {

            if (categoryId == null) {
                return cb.conjunction();
            }

            return cb.equal(
                    root.get("category").get("id"),
                    categoryId
            );
        };

    }

    public static Specification<Product> hasMinPrice(BigDecimal minPrice) {

        return (root, query, cb) -> {

            if (minPrice == null) {
                return cb.conjunction();
            }

            return cb.greaterThanOrEqualTo(
                    root.get("price"),
                    minPrice
            );
        };
    }

    public static Specification<Product> hasMaxPrice(BigDecimal maxPrice) {

        return (root, query, cb) -> {

            if (maxPrice == null) {
                return cb.conjunction();
            }

            return cb.lessThanOrEqualTo(
                    root.get("price"),
                    maxPrice
            );
        };
    }

    public static Specification<Product> hasSeller(Long sellerId) {

        return (root, query, cb) -> {

            if (sellerId == null) {
                return cb.conjunction();
            }

            return cb.equal(
                    root.get("seller").get("id"),
                    sellerId
            );
        };
    }
    public static Specification<Product> isActive() {

        return (root, query, cb) ->
                cb.isTrue(root.get("active"));
    }
    public static Specification<Product> inStock() {

        return (root, query, cb) ->
                cb.greaterThan(root.get("stock"), 0);
    }
}
