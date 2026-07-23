package com.marketplace.backend.controller;

import com.marketplace.backend.dto.order.OrderResponse;
import com.marketplace.backend.dto.order.PlaceOrderRequest;
import com.marketplace.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @Valid @RequestBody PlaceOrderRequest request
    ) {
        return ResponseEntity.ok(
                orderService.placeOrder(request)
        );

    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders() {

        return ResponseEntity.ok(
                orderService.getMyOrders()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                orderService.getOrder(id)
        );

    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelOrder(
            @PathVariable Long id
    ) {

        orderService.cancelOrder(id);

        return ResponseEntity.ok("Order cancelled successfully");

    }

}