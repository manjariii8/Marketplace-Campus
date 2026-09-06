package com.marketplace.backend.service.impl;

import com.marketplace.backend.dto.response.AuthResponse;
import com.marketplace.backend.dto.request.LoginRequest;
import com.marketplace.backend.dto.request.RegisterRequest;
import com.marketplace.backend.enums.Role;
import com.marketplace.backend.exception.DuplicateResourceException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.repository.UserRepository;
import com.marketplace.backend.service.AuthService;
import com.marketplace.backend.util.JwtService;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Email is already registered"
            );
        }

        com.marketplace.backend.entity.User user =
                com.marketplace.backend.entity.User.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                        )
                        .role(request.getRole())
                        .build();

        userRepository.save(user);

        UserDetails userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();

        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                "Registration successful",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        com.marketplace.backend.entity.User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserDetails userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();

        String token = jwtService.generateToken(userDetails);
        log.info("User logged in successfully. Email={}", request.getEmail());

        return new AuthResponse(
                token,
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

    }
}
