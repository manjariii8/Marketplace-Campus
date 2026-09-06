import api from "../api/axios";

export const createPaymentOrder = (orderId) => {
  return api.post("/payments/create-order", {
    orderId,
  });
};

export const verifyPayment = (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) => {
  return api.post("/payments/verify", {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });
};