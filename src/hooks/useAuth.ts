import { useRecord } from "@/api-connection/record-hooks/useRecord";

export const useAuth = () => {
  // loads from  localstorage
  // validates on FE decodes, get user id
  // valis -> does a req to a protected route, eg, its user id profile
  // ok -> can procede

  const token = localStorage.getItem("authToken");
  if (!token) {
    return { isAuthenticated: false, user: null, isLoading: false };
  }

  let userId = "";
  try {
    userId = decodeToken(token);
  } catch (error) {
    localStorage.removeItem("authToken");
    return { isAuthenticated: false, user: null, isLoading: false };
  }

  const { data, error, isLoading, isSuccess } = useRecord("/users", Number(userId));
  if (error) {
    localStorage.removeItem("authToken");
    return { isAuthenticated: false, user: null, isLoading: false };
  }

  return {
    isAuthenticated: isSuccess && !!data,
    user: data || null,
    isLoading,
  };
};

const decodeToken = (token: string) => {
  return token
};
