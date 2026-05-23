import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: 'application/json',
  },
});

let logoutHandler = null;

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

apiClient.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/session_token=([^;]+)/);
      const token = match ? match[1] : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        logoutHandler?.();
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: "Terjadi kesalahan koneksi internet." });
  },
);

export default apiClient;
