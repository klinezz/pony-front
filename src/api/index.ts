import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});
export default api;
