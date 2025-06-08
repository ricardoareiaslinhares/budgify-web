import { NextResponse } from "next/server";
import { API_URL, API_ROUTES } from "@/constants";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
  console.log("called user api =>",searchParams.toString() ); // Delete
  

  const response = await fetch(`${API_URL}${API_ROUTES.users.be}?${searchParams.toString()}`, {
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


}
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    const userId = searchParams.get('id');

  const response = await fetch(`${API_URL}${API_ROUTES.users.be}/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`, },
  });

  if (!response.ok) {
    const text = await response.text();
    return new NextResponse(text, { status: response.status });
  }

  const data = await response.json();

const responseData = NextResponse.json(data);
console.log("responseData =>", responseData.body); // Delete


return responseData;


}


export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    const userId = searchParams.get('id');
    console.log("userId ---------------------=>", userId); // Delete
    

  const response = await fetch(`${API_URL}${API_ROUTES.users.be}/${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`, },
  });

  if (!response.ok) {
    const text = await response.text();
    return new NextResponse(text, { status: response.status });
  }

  const data = await response.json();

const responseData = NextResponse.json(data);
console.log("responseData =>", responseData.body); // Delete


return responseData;


}
