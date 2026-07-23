package com.marketplace.backend.service;

import com.marketplace.backend.dto.response.AuthResponse;
import com.marketplace.backend.dto.request.LoginRequest;
import com.marketplace.backend.dto.request.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
