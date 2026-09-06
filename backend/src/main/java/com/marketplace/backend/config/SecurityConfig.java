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
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {})

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // PUBLIC
                        // =========================

                        .requestMatchers(
                                "/api/auth/**",
                                "/api/products/search",
                                "/api/products/{id}"
                        ).permitAll()

                        // Categories can be viewed publicly
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categories/**"
                        ).permitAll()


                        // =========================
                        // ADMIN
                        // =========================

                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")


                        // =========================
                        // SELLER
                        // =========================

                        .requestMatchers("/api/seller/**")
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
                        // PUBLIC PRODUCT LIST
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products"
                        )
                        .permitAll()


                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest()
                        .permitAll()
                )

                .authenticationProvider(authenticationProvider)

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}