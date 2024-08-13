import axios from "axios";
import Cookies from "js-cookie";
const DEV_URL = "http://localhost:4000/api";

const api = axios.create({
    baseURL: DEV_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    function (config) {
        const token = Cookies.get("con_token") ?? "";
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        // handle your toast error here
        return Promise.reject(error);
    }
);

export default api;
