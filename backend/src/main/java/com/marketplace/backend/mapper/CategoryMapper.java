package com.marketplace.backend.mapper;

import com.marketplace.backend.dto.response.CategoryResponse;
import com.marketplace.backend.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface CategoryMapper {

    CategoryResponse toResponse(Category category);
}
