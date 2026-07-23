import api from "./axios";

export const getProducts = (params) => {

    return api.get("/products/search", {
        params,
    });

};