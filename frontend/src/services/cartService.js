import api from "../api/axios";

export const getCart = () => api.get("/cart");

export const addToCart = (data) =>
    api.post("/cart/add", data);

export const updateCartQuantity = (id, quantity) =>
    api.put(`/cart/${id}?quantity=${quantity}`);

export const removeCartItem = (id) =>
    api.delete(`/cart/${id}`);

export const clearCart = () =>
    api.delete("/cart/clear");