package com.marketplace.backend.mapper;

import com.marketplace.backend.dto.response.SellerProfileResponse;
import com.marketplace.backend.entity.SellerProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SellerProfileMapper {

    @Mapping(source = "user.name", target = "ownerName")
    @Mapping(source = "user.email", target = "ownerEmail")
    SellerProfileResponse toResponse(SellerProfile sellerProfile);
}
