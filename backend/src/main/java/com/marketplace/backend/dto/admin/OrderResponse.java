package com.marketplace.backend.dto.admin;

import com.marketplace.backend.enums.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class OrderResponse {

    private Long id;

    private String customer;

    private String email;

    private BigDecimal totalAmount;

    private OrderStatus status;

    private LocalDateTime orderDate;

}