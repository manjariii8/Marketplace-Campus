package com.marketplace.backend.controller;

import com.marketplace.backend.dto.response.WishlistResponse;
import com.marketplace.backend.service.WishlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/{productId}")
    public ResponseEntity<String> addToWishlist(@Valid
            @PathVariable Long productId
    ) {

        wishlistService.addToWishlist(productId);

        return ResponseEntity.ok("Product added to wishlist");
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> removeFromWishlist(
            @PathVariable Long productId
    ) {

        wishlistService.removeFromWishlist(productId);

        return ResponseEntity.ok("Product removed from wishlist");
    }

    @GetMapping
    public ResponseEntity<List<WishlistResponse>> getWishlist() {

        return ResponseEntity.ok(
                wishlistService.getWishlist()
        );
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<Boolean> isInWishlist(
            @PathVariable Long productId
    ) {

        return ResponseEntity.ok(
                wishlistService.isInWishlist(productId)
        );
    }
}
