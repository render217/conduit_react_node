import axios from "axios";
import Cookies from "js-cookie";
// const DEV_URL = "http://localhost:4000/api";
const PROD_URL = import.meta.env.VITE_BACKEND_URI;

console.log(PROD_URL);
const api = axios.create({
    baseURL: PROD_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    function (config) {
        const token = Cookies.get("con_token") ?? "";
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        // handle your error
        return Promise.reject(error);
    }
);

export default api;
