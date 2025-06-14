"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "./Loading";
import { LinearProgress } from "@mui/material";
import { Navigation } from "./navigation/Navigation";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated || !user.name) {
    return <LinearProgress />;
  }

  return <Navigation userName={user?.name}>{children}</Navigation>;
};
