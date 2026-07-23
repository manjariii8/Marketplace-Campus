package com.marketplace.backend.service;

import com.marketplace.backend.dto.request.SellerProfileRequest;
import com.marketplace.backend.dto.response.SellerProfileResponse;

public interface SellerProfileService {

    SellerProfileResponse createProfile(String email, SellerProfileRequest request);

    SellerProfileResponse getProfile(String email);

    SellerProfileResponse updateProfile(String email, SellerProfileRequest request);

}
