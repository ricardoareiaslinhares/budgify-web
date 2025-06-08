import { NextResponse } from "next/server";
import { API_URL, API_ROUTES } from "@/constants";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
 console.log("IMHERE---------------------------- =>"); // Delete
  

  const response = await fetch(`${API_URL}${API_ROUTES.transactions.be}?${searchParams.toString()}`, {
    //method: "GET",
    headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`, },
  });

  if (!response.ok) {
    const text = await response.text();
    return new NextResponse(text, { status: response.status });
  }

  const data = await response.json();

const responseData = NextResponse.json(data);

return responseData;
console.log("responseData =>", responseData); // Delete



}