package com.marketplace.backend.mapper;

import com.marketplace.backend.dto.response.ProductResponse;
import com.marketplace.backend.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "seller.shopName", target = "sellerName")
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "imageData", target = "imageData")
    ProductResponse toResponse(Product product);
}
