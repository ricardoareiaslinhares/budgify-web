import { API_URL } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: `${API_URL}`,
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* api.interceptors.request.use((config) => {
  const token = localStorage.getItem("LS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 */