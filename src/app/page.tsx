import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/highlights')
  return (
<BodyWraper>
<p>Home</p>
</BodyWraper>
  );
}
