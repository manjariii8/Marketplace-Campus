import api from "../api/axios";

export const getSellerProducts = () => {
    return api.get("/seller/products");
};

export const getProducts = () => {
    return api.get("/products");
};

export const getProduct = (id) => {
    return api.get(`/products/${id}`);
};

export const createProduct = (product) => {
    return api.post("/products", product);
};

export const updateProduct = (id, product) => {
    return api.put(`/products/${id}`, product);
};

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};

export const searchProducts = (params) => {
    return api.get("/products/search", { params });
};