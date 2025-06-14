import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "auth-token",
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    // httpOnly: true, // TODO needs to match the login
  });

  return response;
}
