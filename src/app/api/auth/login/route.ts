import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // WARNING: INSECURE DEVELOPMENT-ONLY PLACEHOLDER!
  // TODO: Replace this entire block with proper, secure credential verification before production deployment.
  // This includes:
  // 1. Hashing passwords (e.g., bcrypt).
  // 2. Verifying the email exists in the database.
  // 3. Comparing hashed passwords securely.
  // 4. Generating secure, short-lived session tokens or JWTs.
  // 5. Implementing proper error handling and logging.
  // 6. Considering rate limiting to prevent brute-force attacks.

  if (!email || !password) {
    // Treat missing/empty credentials as invalid.
    return new NextResponse(JSON.stringify({ message: "Email and password are required" }), {
      status: 401, // 401 Unauthorized for invalid credentials
    });
  }

  // Simulate authentication success ONLY in development.
  // In production, this path MUST be replaced with real authentication logic.
  if (process.env.NODE_ENV !== "production") {
    const cookie = serialize("auth_token", "dummy_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Still use secure in dev if HTTPS is set up
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    console.warn("SECURITY WARNING: Using dummy authentication token in development environment.");
    return new NextResponse(JSON.stringify({ message: "Login successful (DEV ONLY)" }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  } else {
    // In production, if we reach here, it means real authentication logic is missing or failed.
    // This should ideally never be reached if proper authentication is implemented.
    console.error("SECURITY ERROR: Dummy authentication attempted in production environment. This should be replaced with real authentication.");
    return new NextResponse(JSON.stringify({ message: "Authentication failed" }), {
      status: 401, // 401 Unauthorized for production without real auth
    });
  }
}
