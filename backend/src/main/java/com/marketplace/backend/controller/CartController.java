package com.marketplace.backend.controller;

import com.marketplace.backend.dto.cart.AddToCartRequest;
import com.marketplace.backend.dto.cart.CartItemResponse;
import com.marketplace.backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@Valid
            @RequestBody AddToCartRequest request
    ) {

        cartService.addToCart(request);

        return ResponseEntity.ok("Product added to cart");

    }

    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getCart() {

        return ResponseEntity.ok(
                cartService.getCart()
        );

    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<String> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity
    ) {

        cartService.updateQuantity(
                cartItemId,
                quantity
        );

        return ResponseEntity.ok("Quantity updated");

    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> removeItem(
            @PathVariable Long cartItemId
    ) {

        cartService.removeItem(cartItemId);

        return ResponseEntity.ok("Item removed");

    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart() {

        cartService.clearCart();

        return ResponseEntity.ok("Cart cleared");

    }

}