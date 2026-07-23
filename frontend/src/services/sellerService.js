import api from "../api/axios";

export const getSellerProducts = () => {
  return api.get("/seller/products");
};

export const deleteSellerProduct = (id) => {
  return api.delete(`/products/${id}`);
};