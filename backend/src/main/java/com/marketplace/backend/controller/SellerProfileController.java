package com.marketplace.backend.controller;

import com.marketplace.backend.dto.request.SellerProfileRequest;
import com.marketplace.backend.dto.response.ApiResponse;
import com.marketplace.backend.dto.response.SellerProfileResponse;
import com.marketplace.backend.service.SellerProfileService;
import com.marketplace.backend.util.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor
public class SellerProfileController {

    private final SellerProfileService sellerProfileService;

    @PostMapping("/profile")
    public SellerProfileResponse createProfile(Authentication authentication,
                                               @Valid @RequestBody SellerProfileRequest request){
        return  sellerProfileService.createProfile(authentication.getName(),request);
    }

    @GetMapping("/profile")
    public ApiResponse<SellerProfileResponse> getProfile(
            Authentication authentication) {

        return ResponseUtil.success(
                "Seller profile fetched successfully",
                sellerProfileService.getProfile(authentication.getName()));
    }
    @PutMapping("/profile")
    public SellerProfileResponse updateProfile(Authentication authentication,
                                               @Valid @RequestBody SellerProfileRequest request){
        return sellerProfileService.updateProfile(authentication.getName(), request);
    }



}
