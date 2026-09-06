package com.marketplace.backend.dto.payment;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class RazorpayOrderResponse {

    private String orderId;

    private String razorpayOrderId;

    private BigDecimal amount;

    private String key;

    private String currency;

}