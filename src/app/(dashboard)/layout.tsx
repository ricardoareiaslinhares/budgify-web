import { AppDialog } from "@/components/AppDialog";
import { Navigation } from "@/components/navigation/Navigation";
import { AppDialogProvider } from "@/context/AppDialogContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Navigation>
      {children}

    </Navigation>
  );
}
