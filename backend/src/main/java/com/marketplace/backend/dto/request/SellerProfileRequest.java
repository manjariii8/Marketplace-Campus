package com.marketplace.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SellerProfileRequest {

    @NotBlank(message = "Shop name is required")
    @Size(min = 3, max = 100)
    private String shopName;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must contain exactly 10 digits")
    private String phone;

    @NotBlank(message = "Address is required")
    @Size(max = 255)
    private String address;

    @Size(max = 1000)
    private String description;
}
