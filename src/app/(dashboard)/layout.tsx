import { Navigation } from "@/components/navigation/Navigation";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      {children}
    </ProtectedRoutes>
  );
}
