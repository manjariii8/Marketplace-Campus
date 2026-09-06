package com.marketplace.backend.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {

    private Long id;

    private String name;

    private Long totalProducts;

}