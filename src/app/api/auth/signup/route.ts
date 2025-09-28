import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Dummy signup logic
  if (email && password) {
    // In a real application, you would save the user to a database
    console.log("New user registered with email:", email ? `${email.substring(0, 3)}***@***${email.split('@')[1].slice(-3)}` : 'N/A');
    return new NextResponse(JSON.stringify({ message: "Signup successful" }), {
      status: 200,
    });
  } else {
    return new NextResponse(JSON.stringify({ message: "Email and password are required" }), {
      status: 400,
    });
  }
}
