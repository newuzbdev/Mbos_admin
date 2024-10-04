import axios from "axios";

const baseURL = import.meta.env.API_KEY

const axiosPrivate = axios.create({
    baseURL,
})

axiosPrivate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosPrivate.interceptors.response.use((response) => response, (error) => {
    const originalRequest = error.config
    if (error.response.data?.error === "JWT_EXPIRED" && !originalRequest._retry) {
        originalRequest._retry = true
        return axios
            .post(`${baseURL}/admin/refresh`, {
                token: localStorage.getItem("token"),
            })
            .then((res) => {
                localStorage.setItem("access_token", res.data.access_token)
                localStorage.setItem("token", res.data.token)
                return axiosPrivate(originalRequest)
            })
            .catch((err) => {
                return Promise.reject(err)
            })
    }
})

export default axiosPrivate