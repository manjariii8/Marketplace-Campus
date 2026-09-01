import api from "../api/axios";

export const createPaymentOrder = (orderId) => {
  return api.post("/payments/create-order", {
    orderId,
  });
};

export const verifyPayment = (data) => {
  return api.post("/payments/verify", data);
};