// api.ts
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    config.headers.Authorization=`Bearer ${token}`
    return config;
})