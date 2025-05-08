import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  timeout: 70000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const actualToken = localStorage.getItem("@TOKEN");
    if (actualToken) {
      config.headers.Authorization = `Bearer ${actualToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response.config.method", response.config.method);
    if (response.config.method !== "get") {
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("@TOKEN");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
