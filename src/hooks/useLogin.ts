import { API_ROUTES, API_URL, PAGE_ROUTES } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
    networkMode: "always",
    onSuccess: async () => {
      router.replace(PAGE_ROUTES.highlights.path);
    },
  });
};

const login = async (loginData: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await axios.post(API_ROUTES.login.api, loginData);
    console.log("Res from useLogin =>", response); // Delete

  //localStorage.setItem("authToken",  response.data.data.token)
    return response.data;
  } catch (error) {
    console.log("Error on useLogin", error);
    throw error;
  }
};
