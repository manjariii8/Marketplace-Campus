package com.marketplace.backend.controller;

import com.marketplace.backend.dto.request.CategoryRequest;
import com.marketplace.backend.dto.response.ApiResponse;
import com.marketplace.backend.dto.response.CategoryResponse;
import com.marketplace.backend.service.CategoryService;
import com.marketplace.backend.util.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    @PostMapping
    public CategoryResponse createCategory(
            @Valid @RequestBody CategoryRequest request) {

        return categoryService.createCategory(request);
    }

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getCategories() {

        return ResponseUtil.success(
                "Categories fetched successfully",
                categoryService.getAllCategories());
    }

    @PutMapping("/{id}")
    public CategoryResponse updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {

        return categoryService.updateCategory(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {

        categoryService.deleteCategory(id);
    }


}
