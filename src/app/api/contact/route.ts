// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const username = process.env.WP_USER_NAME;
  const password = process.env.WP_APPLICATION_PASSWORD;


  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Server misconfiguration: missing credentials." },
      { status: 500 }
    );
  }

  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  try {
    const response = await fetch(
      "https://vyanzo.gandhineru.com/wp-json/jfb/contact-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Basic ${credentials}`,
        },
        body: JSON.stringify({
          lang:         body.lang         ?? null,
          full_name:    body.full_name    ?? null,
          email:        body.email        ?? null,
          phone_number: body.phone_number ?? null,
          company:      body.company      ?? null,
          message:      body.message      ?? null,
        }),
      }
    );

    const data = await response.json();



    if (response.ok) {
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: data?.message ?? "Submission failed.", data },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("JetFormBuilder API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}