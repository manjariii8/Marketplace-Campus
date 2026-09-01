import api from "../api/axios";


const sellerService = {
  getProfile: () => {
    return api.get("/seller/profile");
  },

  createProfile: (payload) => {
    return api.post("/seller/profile", payload);
  },

  updateProfile: (payload) => {
    return api.put("/seller/profile", payload);
  },
};

export default sellerService;