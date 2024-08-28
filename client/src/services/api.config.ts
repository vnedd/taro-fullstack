import axios from "axios";

const apiConfig = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

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
