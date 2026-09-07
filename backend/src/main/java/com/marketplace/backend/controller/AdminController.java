package com.marketplace.backend.controller;

import com.marketplace.backend.dto.admin.*;

import com.marketplace.backend.entity.Category;
import com.marketplace.backend.enums.OrderStatus;
import com.marketplace.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                adminService.getDashboard()
        );

    }
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers() {

        return ResponseEntity.ok(
                adminService.getAllUsers()
        );

    }
    @GetMapping("/users/search")
    public ResponseEntity<List<UserResponse>> searchUsers(
            @RequestParam String keyword
    ) {

        return ResponseEntity.ok(
                adminService.searchUsers(keyword)
        );

    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        adminService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }
    @GetMapping("/sellers")
    public ResponseEntity<List<SellerResponse>> getAllSellers() {

        return ResponseEntity.ok(
                adminService.getAllSellers()
        );
    }
    @GetMapping("/sellers/pending")
    public ResponseEntity<List<SellerResponse>> getPendingSellers() {

        return ResponseEntity.ok(
                adminService.getPendingSellers()
        );
    }
    @PutMapping("/sellers/{id}/approve")
    public ResponseEntity<String> approveSeller(
            @PathVariable Long id) {

        adminService.approveSeller(id);

        return ResponseEntity.ok("Seller approved successfully");
    }
    @PutMapping("/sellers/{id}/reject")
    public ResponseEntity<String> rejectSeller(
            @PathVariable Long id) {

        adminService.rejectSeller(id);

        return ResponseEntity.ok("Seller rejected successfully");
    }
    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getProducts(){

        return ResponseEntity.ok(
                adminService.getAllProducts());

    }
    @GetMapping("/products/search")
    public ResponseEntity<List<ProductResponse>> searchProducts(
            @RequestParam String keyword){

        return ResponseEntity.ok(
                adminService.searchProducts(keyword));

    }
    @GetMapping("/products/seller/{id}")
    public ResponseEntity<List<ProductResponse>> getSellerProducts(
            @PathVariable Long id){

        return ResponseEntity.ok(
                adminService.getProductsBySeller(id));

    }
    @PutMapping("/products/{id}/hide")
    public ResponseEntity<String> hideProduct(
            @PathVariable Long id){

        adminService.hideProduct(id);

        return ResponseEntity.ok("Product hidden successfully");

    }
    @PutMapping("/products/{id}/show")
    public ResponseEntity<String> showProduct(
            @PathVariable Long id){

        adminService.showProduct(id);

        return ResponseEntity.ok("Product is now visible");

    }
    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id){

        adminService.deleteProduct(id);

        return ResponseEntity.ok("Product deleted successfully");

    }
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> getCategories(){

        return ResponseEntity.ok(
                adminService.getAllCategories());

    }
    @GetMapping("/categories/search")
    public ResponseEntity<List<CategoryResponse>> searchCategories(
            @RequestParam String keyword){

        return ResponseEntity.ok(
                adminService.searchCategories(keyword));

    }
    @PostMapping("/categories")
    public ResponseEntity<CategoryResponse> addCategory(
            @RequestBody Category category){

        return ResponseEntity.ok(
                adminService.createCategory(category));

    }
    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @RequestBody Category category){

        return ResponseEntity.ok(
                adminService.updateCategory(id, category));

    }
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteCategory(
            @PathVariable Long id){

        adminService.deleteCategory(id);

        return ResponseEntity.ok("Category deleted successfully");

    }
    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getOrders(){

        return ResponseEntity.ok(
                adminService.getAllOrders());

    }
    @GetMapping("/orders/recent")
    public ResponseEntity<List<OrderResponse>> recentOrders(){

        return ResponseEntity.ok(
                adminService.getRecentOrders());

    }
    @GetMapping("/orders/search")
    public ResponseEntity<List<OrderResponse>> searchOrders(
            @RequestParam String keyword){

        return ResponseEntity.ok(
                adminService.searchOrders(keyword));

    }
    @GetMapping("/orders/status/{status}")
    public ResponseEntity<List<OrderResponse>> getOrdersByStatus(
            @PathVariable OrderStatus status){

        return ResponseEntity.ok(
                adminService.getOrdersByStatus(status));

    }
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status){

        adminService.updateOrderStatus(id, status);

        return ResponseEntity.ok(
                "Order status updated successfully");

    }

}