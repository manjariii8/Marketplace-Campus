import api from "../api/axios";

export const getSellerProfile = () => {
  return api.get("/seller/profile");
};

export const createSellerProfile = (data) => {
  return api.post("/seller/profile", data);
};

export const updateSellerProfile = (data) => {
  return api.put("/seller/profile", data);
};