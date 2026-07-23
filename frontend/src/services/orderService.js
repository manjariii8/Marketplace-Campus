import api from "../api/axios";

export const placeOrder = (data) => {
  return api.post("/orders", data);
};

export const getOrders = () => {
  return api.get("/orders");
};

export const getOrder = (id) => {
  return api.get(`/orders/${id}`);
};

export const cancelOrder = (id) => {
  return api.put(`/orders/${id}/cancel`);
};