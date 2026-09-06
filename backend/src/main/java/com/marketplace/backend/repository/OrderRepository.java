package com.marketplace.backend.repository;

import com.marketplace.backend.entity.Order;
import com.marketplace.backend.enums.OrderStatus;
import com.marketplace.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByOrderDateDesc(User user);

    long count();

    @Query("""
SELECT COALESCE(SUM(o.totalAmount),0)
FROM Order o
WHERE o.status='DELIVERED'
""")
    Double getTotalRevenue();

    List<Order> findByStatus(OrderStatus status);

    List<Order> findByUser_NameContainingIgnoreCase(String keyword);

    List<Order> findTop10ByOrderByOrderDateDesc();

}