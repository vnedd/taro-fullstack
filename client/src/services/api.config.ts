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

const trackingIntance = axios.create({
  baseURL: "https://backtrack.p.rapidapi.com/v1/track/",
  headers: {
    "X-RapidAPI-Key": "bc020e7cf8msh54cd4727474d983p1a8690jsna5872a561c69",
    "X-RapidAPI-Host": "backtrack.p.rapidapi.com",
  },
});

export { apiConfig, trackingIntance };
