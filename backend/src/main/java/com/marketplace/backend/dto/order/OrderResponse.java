package com.marketplace.backend.dto.order;
import lombok.Builder;
import lombok.Data;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class OrderResponse {

    private Long id;

    private BigDecimal totalAmount;

    private String status;

    private LocalDateTime orderDate;

    private String shippingAddress;

    private String phoneNumber;

    private List<OrderItemResponse> items;
}