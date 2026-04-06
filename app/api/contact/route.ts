import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, areaOfInterest, message, newsletter } =
    body as Record<string, unknown>;

  // Validate required fields
  if (!firstName || !lastName || !email || !areaOfInterest || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const strapiRes = await fetch(`${baseUrl}/api/contact-submissions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: { firstName, lastName, email, phone, areaOfInterest, message, newsletter: !!newsletter },
    }),
  });

  if (!strapiRes.ok) {
    const errorText = await strapiRes.text();
    console.error(`Strapi contact submission error [${strapiRes.status}]:`, errorText);
    return NextResponse.json(
      { error: "Failed to save submission", detail: errorText, status: strapiRes.status },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
