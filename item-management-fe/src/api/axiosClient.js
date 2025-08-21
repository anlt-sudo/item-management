// Các endpoint public
export const PUBLIC_ENDPOINTS = [
  { method: "post", pattern: "/auth" }, // tất cả các endpoint bắt đầu bằng /auth với POST
  { method: "post", pattern: "/auth/" },
  { method: "get", pattern: "/api/products" },
  { method: "get", pattern: "/api/products/" },
];
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

function isPublicEndpoint(url, method) {
  if (!url || !method) return false;
  method = method.toLowerCase();
  return PUBLIC_ENDPOINTS.some((ep) => {
    return method === ep.method && url.startsWith(ep.pattern);
  });
}

axiosClient.interceptors.request.use(
  (config) => {
    if (!isPublicEndpoint(config.url, config.method) && authToken) {
      try {
        const persistRoot = localStorage.getItem("persist:root");
        if (persistRoot) {
          const { auth } = JSON.parse(persistRoot);
          if (auth) {
            const { token } = JSON.parse(auth);
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        }
      } catch (err) {
        // Nếu lỗi parse localStorage, không làm gì cả
        console.error("Error parsing localStorage:", err);
      }
    } else {
      // Nếu là public endpoint thì đảm bảo không có Authorization
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
