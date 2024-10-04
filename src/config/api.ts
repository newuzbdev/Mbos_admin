// import axios from "axios";

// const baseURL = import.meta.env.VITE__API_KEY;

// const axiosPrivate = axios.create({
//     baseURL,
// });

// axiosPrivate.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// axiosPrivate.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const originalRequest = error.config;
//         if (error.response?.data?.error === "JWT_EXPIRED" && !originalRequest._retry) {
//             originalRequest._retry = true;
//             return axios
//                 .post(`${baseURL}/admin/refresh`, {
//                     token: localStorage.getItem("token"),
//                 })
//                 .then((res) => {
//                     localStorage.setItem("accessToken", res.data.data.accessToken);
//                     localStorage.setItem("token", res.data.data.token);
//                     return axiosPrivate(originalRequest);
//                 })
//                 .catch((err) => {
//                     return Promise.reject(err);
//                 });
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosPrivate;
import axios from "axios";

const baseURL = import.meta.env.VITE__API_KEY;

const axiosPrivate = axios.create({
    baseURL,
});

// Request interceptor to add the Authorization header
axiosPrivate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("Access token is missing or undefined");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosPrivate.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // Log the error response for debugging
        console.log("Error response:", error.response?.data);

        if (error.response?.data?.error === "JWT_EXPIRED" && !originalRequest._retry) {
            originalRequest._retry = true;

            return axios
                .post(`${baseURL}/admin/refresh`, {
                    token: localStorage.getItem("token"),
                })
                .then((res) => {
                    console.log("Response from refresh token:", res.data);

                    // Check if response data has the correct structure
                    if (res.data && res.data.data) {
                        // Set new access token and refresh token
                        localStorage.setItem("accessToken", res.data.data.accessToken);
                        localStorage.setItem("token", res.data.data.refreshToken); // Update if you use refresh token

                        console.log("New access token stored:", res.data.data.accessToken);
                    } else {
                        console.error("Invalid response structure for refresh token:", res.data);
                    }

                    // Retry the original request with the new access token
                    return axiosPrivate(originalRequest);
                })
                .catch((err) => {
                    console.error("Error refreshing token:", err);
                    return Promise.reject(err);
                });
        }
        return Promise.reject(error);
    }
);

export default axiosPrivate;
