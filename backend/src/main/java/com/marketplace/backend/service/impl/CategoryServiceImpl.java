package com.marketplace.backend.service.impl;

import com.marketplace.backend.dto.request.CategoryRequest;
import com.marketplace.backend.dto.response.CategoryResponse;
import com.marketplace.backend.entity.Category;
import com.marketplace.backend.exception.DuplicateResourceException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mapper.CategoryMapper;
import com.marketplace.backend.repository.CategoryRepository;
import com.marketplace.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryResponse createCategory(CategoryRequest request){
        if (categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new DuplicateResourceException("Category already exists");
        }

        Category category = Category.builder()
                .name(request.getName().trim())
                .build();

        category = categoryRepository.save(category);

        return categoryMapper.toResponse(category);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }
    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)

                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        category.setName(request.getName().trim());

        category = categoryRepository.save(category);

        return categoryMapper.toResponse(category);
    }
    @Override
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        categoryRepository.delete(category);
    }

}
