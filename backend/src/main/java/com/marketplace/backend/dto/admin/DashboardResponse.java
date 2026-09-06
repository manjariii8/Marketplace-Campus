package com.marketplace.backend.dto.admin;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class DashboardResponse {

    private Long totalUsers;

    private Long totalSellers;

    private Long totalProducts;

    private Long totalOrders;

    private double totalRevenue;
}
