import api from "../../api/axios";

// Dashboard
export const getAdminDashboard = () => api.get("/admin/dashboard");

// ================= USERS =================

export const getAdminUsers = () => api.get("/admin/users");

export const searchAdminUsers = (keyword) =>
  api.get("/admin/users/search", {
    params: { keyword },
  });

export const deleteAdminUser = (id) =>
  api.delete(`/admin/users/${id}`);

// ================= SELLERS =================

export const getAdminSellers = () => api.get("/admin/sellers");

export const getPendingSellers = () =>
  api.get("/admin/sellers/pending");

export const approveSeller = (id) =>
  api.put(`/admin/sellers/${id}/approve`);

export const rejectSeller = (id) =>
  api.put(`/admin/sellers/${id}/reject`);

// ================= PRODUCTS =================

export const getAdminProducts = () =>
  api.get("/admin/products");

export const searchAdminProducts = (keyword) =>
  api.get("/admin/products/search", {
    params: { keyword },
  });
export const getProductsByCategory = (categoryId) => {
  return api.get(`/admin/products/category/${categoryId}`);
};
export const getSellerProducts = (sellerId) =>
  api.get(`/admin/products/seller/${sellerId}`);

export const hideProduct = (id) =>
  api.put(`/admin/products/${id}/hide`);

export const showProduct = (id) =>
  api.put(`/admin/products/${id}/show`);

export const deleteAdminProduct = (id) =>
  api.delete(`/admin/products/${id}`);

// ================= CATEGORIES =================

export const getAdminCategories = () =>
  api.get("/admin/categories");

export const searchAdminCategories = (keyword) =>
  api.get("/admin/categories/search", {
    params: { keyword },
  });

export const createAdminCategory = (category) =>
  api.post("/admin/categories", category);

export const updateAdminCategory = (id, category) =>
  api.put(`/admin/categories/${id}`, category);

export const deleteAdminCategory = (id) =>
  api.delete(`/admin/categories/${id}`);

// ================= ORDERS =================

export const getAdminOrders = () =>
  api.get("/admin/orders");

export const getRecentAdminOrders = () =>
  api.get("/admin/orders/recent");

export const searchAdminOrders = (keyword) =>
  api.get("/admin/orders/search", {
    params: { keyword },
  });

export const getAdminOrdersByStatus = (status) =>
  api.get(`/admin/orders/status/${status}`);

export const updateAdminOrderStatus = (id, status) =>
  api.put(`/admin/orders/${id}/status`, null, {
    params: { status },
  });

