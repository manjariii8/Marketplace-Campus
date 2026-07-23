package com.marketplace.backend.controller;

import com.marketplace.backend.dto.request.ProductFilterRequest;
import com.marketplace.backend.dto.request.ProductRequest;
import com.marketplace.backend.dto.response.ApiResponse;
import com.marketplace.backend.dto.response.ProductResponse;
import com.marketplace.backend.service.ProductService;
import com.marketplace.backend.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "Create a new product")
    @PostMapping
    public ApiResponse<ProductResponse> createProduct(
            Authentication authentication,
            @Valid @RequestBody ProductRequest request) {

        ProductResponse response =
                productService.createProduct(
                        authentication.getName(),
                        request);

        return ResponseUtil.success(
                "Product created successfully",
                response);
    }
    @Operation(summary = "Get all products")
    @GetMapping
    public ApiResponse<List<ProductResponse>> getAllProducts() {

        List<ProductResponse> products = productService.getAllProducts();

        return ResponseUtil.success(
                "Products fetched successfully",
                products
        );

    }

    @GetMapping("/{id}")
    public ProductResponse getProduct(
            @PathVariable Long id) {

        return productService.getProductById(id);

    }
    @PutMapping("/{id}")
    public ProductResponse updateProduct(
            @PathVariable Long id,
            Authentication authentication,
            @Valid @RequestBody ProductRequest request) {

        return productService.updateProduct(
                id,
                authentication.getName(),
                request
        );
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(
            @PathVariable Long id,
            Authentication authentication) {

        productService.deleteProduct(id, authentication.getName());
    }
    @GetMapping("/search")
    public Page<ProductResponse> searchProducts(
            ProductFilterRequest filter) {

        return productService.searchProducts(filter);
    }
    @GetMapping("/my-products")
    public List<ProductResponse> getMyProducts(Authentication authentication) {
        return productService.getProductsBySeller(authentication.getName());
    }
}
