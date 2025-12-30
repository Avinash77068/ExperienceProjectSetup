// src/api/authApi.ts

import axiosClient from "../api/axios";

export const login = async (payload) => {
    console.log(payload);
    const response = await axiosClient.post("/auth/login", payload);
    return response.data;
};
