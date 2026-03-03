import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/drive-name?id=FILEID
 * Resolves the public filename of a Google Drive file by fetching its
 * view page and extracting the <title> tag value.
 * Works for any file shared publicly (no API key required).
 */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://drive.google.com/file/d/${id}/view`, {
      headers: {
        // Mimic a browser so Drive returns the full HTML page
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      // Don't cache so we always get the latest filename
      next: { revalidate: 3600 },
    });

    const html = await res.text();

    // Drive sets <title>FILENAME - Google Drive</title>
    const match = html.match(/<title>([^<]+)<\/title>/i);
    if (match) {
      const raw = match[1];
      // Strip the suffix " - Google Drive"
      const name = raw.replace(/\s*[-–]\s*Google Drive\s*$/i, "").trim();
      return NextResponse.json({ name });
    }

    return NextResponse.json({ name: null });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
