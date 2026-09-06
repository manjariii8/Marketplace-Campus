package com.marketplace.backend.dto.response;

import com.marketplace.backend.enums.SellerStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

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

    private LocalDateTime createdAt;

    private SellerStatus status;
}
