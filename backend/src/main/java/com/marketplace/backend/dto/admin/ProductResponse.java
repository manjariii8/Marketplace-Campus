package com.marketplace.backend.dto.admin;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String category;

    private String seller;

    private BigDecimal price;

    private Integer stock;

    private Boolean active;
}
