package com.marketplace.backend.service;

import com.marketplace.backend.dto.payment.CreateOrderRequest;
import com.marketplace.backend.dto.payment.RazorpayOrderResponse;

public interface PaymentService {

    RazorpayOrderResponse createRazorpayOrder(
            CreateOrderRequest request);

    void verifyPayment(
            String razorpayOrderId,
            String razorpayPaymentId,
            String razorpaySignature);
}