package com.marketplace.backend.service.impl;

import com.marketplace.backend.dto.cart.AddToCartRequest;
import com.marketplace.backend.dto.cart.CartItemResponse;
import com.marketplace.backend.entity.Cart;
import com.marketplace.backend.entity.CartItem;
import com.marketplace.backend.entity.Product;
import com.marketplace.backend.entity.User;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.repository.CartItemRepository;
import com.marketplace.backend.repository.CartRepository;
import com.marketplace.backend.repository.ProductRepository;
import com.marketplace.backend.repository.UserRepository;
import com.marketplace.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private Cart getCurrentCart() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseGet(() -> {

                    Cart cart = Cart.builder()
                            .user(user)
                            .build();

                    return cartRepository.save(cart);

                });

    }

    @Override
    public void addToCart(AddToCartRequest request) {

        Cart cart = getCurrentCart();

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Optional<CartItem> existing =
                cartItemRepository.findByCartAndProduct(cart, product);

        if (existing.isPresent()) {

            CartItem item = existing.get();

            item.setQuantity(
                    item.getQuantity() + request.getQuantity()
            );

            cartItemRepository.save(item);

            return;
        }

        CartItem item = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(request.getQuantity())
                .build();

        cartItemRepository.save(item);

    }

    @Override
    public List<CartItemResponse> getCart() {

        Cart cart = getCurrentCart();

        return cartItemRepository.findByCart(cart)

                .stream()

                .map(item -> CartItemResponse.builder()

                        .id(item.getId())

                        .productId(item.getProduct().getId())

                        .productName(item.getProduct().getName())

                        .price(item.getProduct().getPrice())

                        .quantity(item.getQuantity())

                        .totalPrice(
                                item.getProduct().getPrice()
                                        .multiply(BigDecimal.valueOf(item.getQuantity()))
                        )

                        .build())

                .toList();

    }

    @Override
    public void updateQuantity(Long cartItemId,
                               Integer quantity) {

        CartItem item = cartItemRepository.findById(cartItemId)

                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart item not found"));

        item.setQuantity(quantity);

        cartItemRepository.save(item);

    }

    @Override
    public void removeItem(Long cartItemId) {

        cartItemRepository.deleteById(cartItemId);

    }

    @Override
    public void clearCart() {

        Cart cart = getCurrentCart();

        cartItemRepository.deleteByCart(cart);

    }
}