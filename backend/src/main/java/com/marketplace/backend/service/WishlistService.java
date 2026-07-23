package com.marketplace.backend.service;

import com.marketplace.backend.dto.response.WishlistResponse;

import java.util.List;

public interface WishlistService {

    void addToWishlist(Long productId);

    void removeFromWishlist(Long productId);

    List<WishlistResponse> getWishlist();

    boolean isInWishlist(Long productId);
}