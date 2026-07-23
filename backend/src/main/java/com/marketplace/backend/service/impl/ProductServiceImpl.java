package com.marketplace.backend.service.impl;

import com.marketplace.backend.dto.request.ProductFilterRequest;
import com.marketplace.backend.dto.request.ProductRequest;
import com.marketplace.backend.dto.response.ProductResponse;
import com.marketplace.backend.entity.Category;
import com.marketplace.backend.entity.Product;
import com.marketplace.backend.entity.SellerProfile;
import com.marketplace.backend.entity.User;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mapper.ProductMapper;
import com.marketplace.backend.repository.CategoryRepository;
import com.marketplace.backend.repository.ProductRepository;
import com.marketplace.backend.repository.SellerProfileRepository;
import com.marketplace.backend.repository.UserRepository;
import com.marketplace.backend.service.ProductService;
import com.marketplace.backend.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SellerProfileRepository sellerProfileRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductResponse createProduct(String email, ProductRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        SellerProfile seller = sellerProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Seller profile not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .seller(seller)
                .category(category)
                .build();

        product = productRepository.save(product);

        return productMapper.toResponse(product);
    }

    public List<ProductResponse> getAllProducts() {

        return productRepository.findByActiveTrue()
                .stream()
                .map(productMapper::toResponse)
                .toList();

    }

    @Override
    public List<ProductResponse> getProductsBySeller(String name) {
        return List.of();
    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        return productMapper.toResponse(product);

    }

    @Override
    public ProductResponse updateProduct(Long id, String email, ProductRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        SellerProfile seller = sellerProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Seller profile not found"));

        Product product = productRepository.findByIdAndSellerId(id, seller.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found or access denied"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(category);

        productRepository.save(product);

        log.info(
                "Product created successfully. ProductId={}, SellerId={}",
                product.getId(),
                seller.getId()
        );

        return productMapper.toResponse(product);
    }

    @Override
    public void deleteProduct(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        SellerProfile seller = sellerProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Seller profile not found"));

        Product product = productRepository.findByIdAndSellerId(id, seller.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found or access denied"));

        productRepository.delete(product);
        log.info(
                "Product deleted. ProductId={}, SellerId={}",
                product.getId(),
                seller.getId()
        );

    }
    @Override
    public Page<ProductResponse> searchProducts(ProductFilterRequest filter) {

        Sort sort = Sort.by(filter.getSortBy());

        sort = filter.getDirection().equalsIgnoreCase("desc")
                ? sort.descending()
                : sort.ascending();

        Pageable pageable = PageRequest.of(
                filter.getPage(),
                filter.getSize(),
                sort
        );

        Specification<Product> specification = Specification
                .where(ProductSpecification.isActive())
                .and(ProductSpecification.hasKeyword(filter.getKeyword()))
                .and(ProductSpecification.hasCategory(filter.getCategoryId()))
                .and(ProductSpecification.hasMinPrice(filter.getMinPrice()))
                .and(ProductSpecification.hasMaxPrice(filter.getMaxPrice()))
                .and(ProductSpecification.hasSeller(filter.getSellerId()))
                .and(ProductSpecification.inStock());

        return productRepository
                .findAll(specification, pageable)
                .map(productMapper::toResponse);
    }

}
