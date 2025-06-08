"use client"

import { useRecords } from "@/api-connection/record-hooks/useRecords";
import { API_ROUTES } from "@/constants";
import { User } from "@/types/entities";


export const useAuth = () => {
  const { data, error, isLoading, isSuccess } = useRecords<User>(API_ROUTES.user, "");
  console.log("data from useAuth2 =>", data); // Delete

  const user = data as unknown as User
  
  return {
    isAuthenticated: isSuccess && !!data,
    user: user || null,
    isLoading,
  };
}