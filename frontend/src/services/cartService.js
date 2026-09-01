import api from "../api/axios";

export const getCart = () => {
    return api.get("/cart");
};

export const addToCart = (data) => {
    return api.post("/cart/add", data);
};

export const updateCartQuantity = (id, quantity) => {
    return api.put(`/cart/${id}?quantity=${quantity}`);
};

export const removeCartItem = (id) => {
    return api.delete(`/cart/${id}`);
};

export const clearCart = () => {
    return api.delete("/cart/clear");
};