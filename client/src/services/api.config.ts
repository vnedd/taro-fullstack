import { API_URL } from "@/constants/api";
import axios from "axios";

const apiConfig = () => {
  axios.defaults.baseURL = API_URL;

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      config.headers.Authorization = token ? `Bearer ${token}` : null;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export { apiConfig };
