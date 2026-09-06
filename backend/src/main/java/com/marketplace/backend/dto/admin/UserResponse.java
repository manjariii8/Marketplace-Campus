package com.marketplace.backend.dto.admin;

import com.marketplace.backend.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private Role role;

}