package com.marketplace.backend.service;

import com.marketplace.backend.dto.order.OrderResponse;
import com.marketplace.backend.dto.order.PlaceOrderRequest;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(PlaceOrderRequest request);

    List<OrderResponse> getMyOrders();

    OrderResponse getOrder(Long orderId);

    void cancelOrder(Long orderId);
}