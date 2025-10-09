import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new NextResponse(JSON.stringify({ message: "Email and password are required" }), {
      status: 400,
    });
  }

  // Dummy signup logic
  // In a real application, you would save the user to a database
  // TODO: In a production environment, consider removing or heavily gating this log to avoid exposing even masked emails.
  let maskedEmail;
  if (typeof email === 'string' && email.includes('@')) {
    const [localPart, domainPart] = email.split('@');
    const maskedLocal = localPart.length > 3 ? `${localPart.substring(0, 3)}***` : '***';
    const maskedDomainSuffix = domainPart.length > 3 ? `***${domainPart.slice(-3)}` : '***';
    maskedEmail = `${maskedLocal}@${maskedDomainSuffix}`;
  } else {
    maskedEmail = '[redacted/invalid email format]';
  }
  console.log("New user registered with email:", maskedEmail);
  return new NextResponse(JSON.stringify({ message: "Signup successful" }), {
    status: 200,
  });
}
