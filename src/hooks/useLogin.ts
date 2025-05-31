import { api } from "@/api-connection/config";
import { useRecords } from "@/api-connection/record-hooks/useRecords";
import { API_URL, PAGE_ROUTES } from "@/constants";
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
  const route = "/login"; // "/authetication/login"
  const dataForMock = {
    ...loginData,
    token: "abc123xyz456",
    creation_date: "2025-05-30T10:00:00Z"
    
  }
  console.log("dataForMock =>", dataForMock); // Delete
  console.log(`${API_URL}${route}`);

  const response = await axios({
    method: "POST",
    url: `${API_URL}${route}`,
    data: dataForMock,
  });
  console.log("response =>", response.data); // Delete
  

  return response.data;
};
