import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Dummy authentication logic
  if (email === "test@example.com" && password === "password") {
    const cookie = serialize("auth_token", "dummy_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return new NextResponse(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  } else {
    return new NextResponse(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }
}
