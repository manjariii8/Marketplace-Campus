import api from "../api/axios";

const authService = {
  register: (payload) => api.post("/auth/register", payload),

  login: (credentials) => api.post("/auth/login", credentials),

  getProfile: () =>
    api.get("/auth/profile"),
};

export default authService;