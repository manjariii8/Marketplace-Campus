package com.marketplace.backend.service;

import com.marketplace.backend.dto.admin.*;
import com.marketplace.backend.entity.Category;
import com.marketplace.backend.enums.OrderStatus;


import java.util.List;

public interface AdminService {

    DashboardResponse getDashboard();

    List<UserResponse> getAllUsers();

    List<UserResponse> searchUsers(String keyword);

    void deleteUser(Long id);

    List<SellerResponse> getAllSellers();

    List<SellerResponse> getPendingSellers();

    void approveSeller(Long sellerId);

    void rejectSeller(Long sellerId);

    List<ProductResponse> getAllProducts();

    List<ProductResponse> searchProducts(String keyword);

    List<ProductResponse> getProductsByCategory(Long categoryId);

    List<ProductResponse> getProductsBySeller(Long sellerId);

    void hideProduct(Long productId);

    void showProduct(Long productId);

    void deleteProduct(Long productId);

    List<CategoryResponse> getAllCategories();

    List<CategoryResponse> searchCategories(String keyword);

    CategoryResponse createCategory(Category category);

    CategoryResponse updateCategory(Long id, Category category);

    void deleteCategory(Long id);

    List<OrderResponse> getAllOrders();

    List<OrderResponse> getOrdersByStatus(OrderStatus status);

    List<OrderResponse> searchOrders(String keyword);

    List<OrderResponse> getRecentOrders();

    void updateOrderStatus(Long orderId, OrderStatus status);





}