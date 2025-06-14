"use client"

import { useRecords } from "@/api-connection/record-hooks/useRecords";
import { API_ROUTES } from "@/constants";
import { User } from "@/types/entities";


export const useAuth = () => {
  const { data, error, isLoading, isSuccess } = useRecords<User>(API_ROUTES.user.api, "");
  const user = data as unknown as User
  
    return {
    isAuthenticated: isSuccess && !error && !!data,
    user: user || null,
    isLoading,
  }; 
 
  //To navigate withou BE connection:
  /*   
    return {
    isAuthenticated: true,
    user: {name:"fake"},
    isLoading: false
  }; */
}
