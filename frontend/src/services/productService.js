import api from "../api/axios";

// Get all products
export const getProducts = () => {
  return api.get("/products");
};

// Get single product
export const getProduct = (id) => {
  return api.get(`/products/${id}`);
};

// Keep compatibility with components using getProductById
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};


// Search products
export const searchProducts = (filters = {}) => {
  return api.get("/products/search", {
    params: filters,
  });
};

// Create product
export const createProduct = (productData) => {
  return api.post("/products", productData);
};

// Update product
export const updateProduct = (id, productData) => {
  return api.put(`/products/${id}`, productData);
};

// Delete product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

// Get products belonging to logged-in seller
export const getMyProducts = () => {
  return api.get("/products/my-products");
};
