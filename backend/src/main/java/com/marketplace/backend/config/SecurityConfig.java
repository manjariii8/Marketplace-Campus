package com.marketplace.backend.config;

import com.marketplace.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                // =========================
                // CORS
                // =========================

                .cors(cors -> {})

                // =========================
                // CSRF
                // =========================

                .csrf(csrf -> csrf.disable())

                // =========================
                // SESSION
                // =========================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =========================
                // AUTHORIZATION
                // =========================

                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // CORS PREFLIGHT
                        // =========================

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // =========================
                        // PUBLIC AUTH
                        // =========================

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // =========================
                        // PUBLIC PRODUCTS
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products/search"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products/{id}"
                        ).permitAll()

                        // =========================
                        // PUBLIC CATEGORIES
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categories/**"
                        ).permitAll()

                        // =========================
                        // ADMIN
                        // =========================

                        .requestMatchers(
                                "/api/admin/**"
                        )
                        .hasRole("ADMIN")

                        // =========================
                        // SELLER
                        // =========================

                        .requestMatchers(
                                "/api/seller/**"
                        )
                        .hasRole("SELLER")

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/products"
                        )
                        .hasRole("SELLER")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/products/**"
                        )
                        .hasRole("SELLER")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/products/**"
                        )
                        .hasRole("SELLER")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products/my-products"
                        )
                        .hasRole("SELLER")

                        // =========================
                        // CUSTOMER
                        // =========================

                        .requestMatchers(
                                "/api/cart/**",
                                "/api/orders/**"
                        )
                        .authenticated()

                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest()
                        .permitAll()
                )

                // =========================
                // AUTHENTICATION
                // =========================

                .authenticationProvider(authenticationProvider)

                // =========================
                // JWT FILTER
                // =========================

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}