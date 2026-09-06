package com.marketplace.backend.dto.admin;

import com.marketplace.backend.enums.SellerStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerResponse {

    private Long userId;

    private Long sellerId;

    private String sellerName;

    private String email;

    private String businessName;

    private String phone;

    private SellerStatus status;

}