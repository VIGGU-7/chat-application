import axios from "axios";
export const apiInstance=axios.create(
   { baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true}
)