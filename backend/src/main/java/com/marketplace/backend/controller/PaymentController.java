package com.marketplace.backend.controller;

import com.marketplace.backend.dto.payment.CreateOrderRequest;
import com.marketplace.backend.dto.payment.RazorpayOrderResponse;
import com.marketplace.backend.dto.payment.VerifyPaymentRequest;
import com.marketplace.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;


    @PostMapping("/create-order")
    public ResponseEntity<RazorpayOrderResponse> createOrder(
            @RequestBody CreateOrderRequest request) {

        return ResponseEntity.ok(
                paymentService.createRazorpayOrder(request)
        );
    }
    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestBody VerifyPaymentRequest request) {

        paymentService.verifyPayment(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature()
        );

        return ResponseEntity.ok("Payment verified successfully");
    }
}
