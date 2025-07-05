import axios from "axios";
export const apiInstance=axios.create(
   { baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true}
)
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});