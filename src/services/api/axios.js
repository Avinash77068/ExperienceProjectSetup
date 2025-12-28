// // src/services/axiosClient.ts
// import axios from "axios";
// import store from "../store"; // apna redux store path adjust karo

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// /* ------------------ CREATE AXIOS CLIENT ------------------ */
// export const createAxiosClient = (baseURL) => {
//     return axios.create({
//         baseURL: baseURL || BASE_URL,
//         timeout: 10000,
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//     });
// };

// /* ------------------ INTERCEPTORS ------------------ */
// const setupInterceptors = (client) => {
//     /* -------- REQUEST INTERCEPTOR -------- */
//     client.interceptors.request.use(
//         (config) => {
//             const token = store.getState()?.user?.token;

//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }

//             return config;
//         },
//         (error) => {
//             console.error("[AXIOS REQUEST ERROR]", error);
//             return Promise.reject(error);
//         }
//     );

//     /* -------- RESPONSE INTERCEPTOR -------- */
//     client.interceptors.response.use(
//         (response) => response,
//         (error) => {
//             const status = error?.response?.status;
//             const message =
//                 error?.response?.data?.message ||
//                 error.message ||
//                 "Something went wrong";

//             console.error("[AXIOS RESPONSE ERROR]", status, message);

//             return Promise.reject({
//                 status,
//                 message,
//                 data: error?.response?.data,
//             });
//         }
//     );
// };

// /* ------------------ CLIENT INSTANCES ------------------ */
// const axiosClient = createAxiosClient();
// setupInterceptors(axiosClient);

// export const adminAxiosClient = createAxiosClient(BASE_URL);
// setupInterceptors(adminAxiosClient);

// export default axiosClient;
