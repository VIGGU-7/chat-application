import axios from "axios";
export const apiInstance=axios.create(
   { baseURL: "https://chatapp-omega-amber.vercel.app/api",
    withCredentials: true}
)