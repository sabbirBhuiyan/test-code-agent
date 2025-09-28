import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new NextResponse(JSON.stringify({ message: "Email and password are required" }), {
      status: 400,
    });
  }

  // In a real application, you would validate the email and password against a database
  // For this example, we'll just check if they are present.
  if (email && password) {
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
