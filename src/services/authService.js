import axiosClient from "./api/axios";

export const authAPI = {
    login: async (payload) => {
        const response = await axiosClient.post("/auth/login", payload);
        return response.data;
    },

    register: async (payload) => {
        const response = await axiosClient.post("/auth/register", payload);
        return response.data;
    },

    logout: async () => {
        const response = await axiosClient.post("/auth/logout");
        return response.data;
    },

    refreshToken: async (refreshToken) => {
        const response = await axiosClient.post("/auth/refresh", { refreshToken });
        return response.data;
    },

    getProfile: async () => {
        const response = await axiosClient.get("/auth/profile");
        return response.data;
    },
};
