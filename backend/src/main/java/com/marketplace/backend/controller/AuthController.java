package com.marketplace.backend.controller;

import com.marketplace.backend.dto.response.ApiResponse;
import com.marketplace.backend.dto.response.AuthResponse;
import com.marketplace.backend.dto.request.LoginRequest;
import com.marketplace.backend.dto.request.RegisterRequest;
import com.marketplace.backend.service.AuthService;
import com.marketplace.backend.util.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request){

        return ResponseUtil.success(
                "Registration successful",
                authService.register(request));
    }
    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request){
        return ResponseUtil.success(
                "Login successful",
                authService.login(request));
    }
}
