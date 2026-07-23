package com.marketplace.backend.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductFilterRequest {

    private String keyword;

    private Long categoryId;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

    private Long sellerId;

    private Integer page = 0;

    private Integer size = 10;

    private String sortBy = "createdAt";

    private String direction = "desc";
}
