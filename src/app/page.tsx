import { PAGE_ROUTES } from "@/constants";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(PAGE_ROUTES.login.path)
}
