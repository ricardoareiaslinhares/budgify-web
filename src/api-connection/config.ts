"use client"
import { API_URL } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: `${API_URL}`,
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

 api.interceptors.request.use((config) =>  {
  //const token = localStorage.getItem("authToken");
  /* 
  I dont know why, but the localstorage method stoped working as soon i set the cookie in api/route. now only works if i get it from the cookies
  */
    const token = getTokenFromCookies();
  
  if (token) {


    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 
 

function getTokenFromCookies() {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth-token="));
  return match?.split("=")[1];
}