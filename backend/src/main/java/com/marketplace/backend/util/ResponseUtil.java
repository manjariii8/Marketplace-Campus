package com.marketplace.backend.util;

import com.marketplace.backend.dto.response.ApiResponse;

public class ResponseUtil {
    private ResponseUtil() {
    }

    public static <T> ApiResponse<T> success(String message, T data) {

        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }
}
