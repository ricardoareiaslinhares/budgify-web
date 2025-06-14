"use client"
import { API_URL } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: "", //`${API_URL}`,
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// If we would not use the next api routes, we could handle the token this way (uncomenting all commented code):
// Also uncoment the set Token on localS on LoginForm

/*  api.interceptors.request.use((config) =>  {
  const token = localStorage.getItem("authToken");
  
  if (token) {
    console.log("token =>", token); // Delete
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 

 */
