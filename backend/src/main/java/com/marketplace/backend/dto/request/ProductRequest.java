package com.marketplace.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    @Size(
            min = 3,
            max = 100,
            message = "Product name must be between 3 and 100 characters"
    )
    private String name;

    @Size(
            max = 2000,
            message = "Description cannot exceed 2000 characters"
    )
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(
            value = "0.0",
            message = "Price must be greater than 0"
    )
    private BigDecimal price;

    @NotNull(message = "Stock is required")
    @Min(
            value = 0,
            message = "Stock cannot be negative"
    )
    private Integer stock;

    @NotNull(message = "Category is required")
    private Long categoryId;

    // NEW
    private String imageData;
}