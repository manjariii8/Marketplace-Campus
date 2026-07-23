package com.marketplace.backend.service;

import com.marketplace.backend.dto.cart.AddToCartRequest;
import com.marketplace.backend.dto.cart.CartItemResponse;

import java.util.List;

public interface CartService {

    void addToCart(AddToCartRequest request);

    List<CartItemResponse> getCart();

    void updateQuantity(Long cartItemId, Integer quantity);

    void removeItem(Long cartItemId);

    void clearCart();
}