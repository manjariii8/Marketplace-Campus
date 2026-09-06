package com.marketplace.backend.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentOrderResponse {

    private String paymentOrderId;

    private Long amount;

    private String currency;

    private Long orderId;
}
