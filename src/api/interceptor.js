import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";
import { ToastRef } from "../components/controls/Toast";
import { store } from "../redux/store";
import { handleLogout } from "../redux/Auth/Reducer";

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
    if (response.config.method !== "get") {
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      ToastRef.showSnackbar("Session expired, please login again", 'error');
      store.dispatch(handleLogout());
      localStorage.removeItem("@TOKEN");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
