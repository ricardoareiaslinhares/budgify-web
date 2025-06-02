"use client"
import { useRecord } from "@/api-connection/record-hooks/useRecord";
import { useEffect, useState } from "react";


export const useAuth = () => {
  // loads from  localstorage
  // validates on FE decodes, get user id
  // valis -> does a req to a protected route, eg, its user id profile
  // ok -> can procede

  // or

// 2. sends token on params to get user info 

 const [userId, setUserId] = useState<string | null>(null)
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    console.log("storedToken =>", storedToken); // Delete
    
    if (!storedToken) return

    try {
      setUserId(storedToken)
      
    } catch (err) {
        console.log("error decoding token =>"); // Delete
        
      localStorage.removeItem('authToken')
    }
  }, [])

console.log("userId =>", userId); // Delete


// FAz sempre um pedido a mais antes do userID ser o verdadeiro
  const { data, error, isLoading, isSuccess } = useRecord("/users", Number(userId), "");



  useEffect(() => {
    if (error || (!isLoading && isSuccess && !userId)) {
      localStorage.removeItem('authToken')
    }
  }, [error, userId])


  return {
    isAuthenticated: isSuccess && !!data,
    user: data || null,
    isLoading,
  };
};

