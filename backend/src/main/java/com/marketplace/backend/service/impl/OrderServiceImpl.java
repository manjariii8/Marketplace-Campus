package com.marketplace.backend.service.impl;

import com.marketplace.backend.dto.order.OrderItemResponse;
import com.marketplace.backend.dto.order.OrderResponse;
import com.marketplace.backend.dto.order.PlaceOrderRequest;
import com.marketplace.backend.entity.*;
import com.marketplace.backend.exception.IllegalOrderStateException;
import com.marketplace.backend.exception.InsufficientStockException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.exception.UnauthorizedException;
import com.marketplace.backend.repository.*;
import com.marketplace.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public OrderResponse placeOrder(PlaceOrderRequest request) {

        User user = getCurrentUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        if (cartItems.isEmpty()) {
            throw new IllegalOrderStateException("Cart is empty");
        }

        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .phoneNumber(request.getPhoneNumber())
                .status(OrderStatus.PENDING)
                .totalAmount(BigDecimal.valueOf(0.0))
                .build();

        order = orderRepository.save(order);

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new InsufficientStockException(
                        product.getName(),
                        product.getStock(),
                        cartItem.getQuantity()
                );
            }

            product.setStock(
                    product.getStock() - cartItem.getQuantity()
            );

            productRepository.save(product);


            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .price(product.getPrice())
                    .build();

            orderItemRepository.save(orderItem);

            total = total.add(
                    product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()))
            );
        }

        order.setTotalAmount(total);

        orderRepository.save(order);

        cartItemRepository.deleteByCart(cart);

        return OrderResponse.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .status(String.valueOf(order.getStatus()))
                .orderDate(order.getOrderDate())
                .build();
    }

    @Override
    public List<OrderResponse> getMyOrders() {

        User user = getCurrentUser();

        return orderRepository
                .findByUserOrderByOrderDateDesc(user)
                .stream()
                .map(order -> OrderResponse.builder()
                        .id(order.getId())
                        .totalAmount(order.getTotalAmount())
                        .status(String.valueOf(order.getStatus()))
                        .orderDate(order.getOrderDate())
                        .build())
                .toList();
    }

    @Override
    public OrderResponse getOrder(Long orderId) {

        User user = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return OrderResponse.builder()
                .id(order.getId())
                .status(order.getStatus().name())
                .totalAmount(order.getTotalAmount())
                .orderDate(order.getOrderDate())
                .shippingAddress(order.getShippingAddress())
                .phoneNumber(order.getPhoneNumber())
                .items(
                        order.getItems()
                                .stream()
                                .map(item ->
                                        OrderItemResponse.builder()
                                                .productId(item.getProduct().getId())
                                                .productName(item.getProduct().getName())
                                                .price(item.getPrice())
                                                .quantity(item.getQuantity())
                                                .total(
                                                        item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                                                )
                                                .build()
                                )
                                .toList()
                )
                .build();
    }
    @Override
    public void cancelOrder(Long orderId) {

        User user = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new IllegalOrderStateException(
                    "Order is already cancelled."
            );
        }

        if (order.getStatus() == OrderStatus.SHIPPED
                || order.getStatus() == OrderStatus.DELIVERED) {

            throw new IllegalOrderStateException(
                    "Order cannot be cancelled."
            );

        }

        for (OrderItem item : order.getItems()) {

            Product product = item.getProduct();

            product.setStock(
                    product.getStock() + item.getQuantity()
            );

            productRepository.save(product);

        }

        order.setStatus(OrderStatus.CANCELLED);

        orderRepository.save(order);
    }
    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }
}