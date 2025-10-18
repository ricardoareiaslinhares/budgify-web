import { NextResponse } from "next/server";
import { API_URL, API_ROUTES } from "@/constants";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("body API called =>", body); // Delete

  console.log(`${API_URL}${API_ROUTES.login.be}`);
  const response = await fetch(`${API_URL}${API_ROUTES.login.be}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log("response =>", response); // Delete

  if (!response.ok) {
    const text = await response.text();
    return new NextResponse(text, { status: response.status });
  }

  const data = await response.json();

  console.log(data);
  const token = data.data.token;

  const responseData = NextResponse.json(data);
  responseData.cookies.set({
    name: "auth-token",
    value: token,
    //httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
  return responseData;
}
