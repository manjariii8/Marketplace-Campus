package com.marketplace.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerProfileResponse {

    private Long id;

    private String shopName;

    private String phone;

    private String address;

    private String description;

    private Boolean verified;

    private String ownerName;

    private String ownerEmail;
}
