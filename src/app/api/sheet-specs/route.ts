import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/sheet-specs?url=<GOOGLE_SHEETS_EDIT_URL>
 *
 * Converts a Google Sheets edit/view URL to its CSV export equivalent,
 * fetches the CSV, and returns the data as an array of { key, value } rows.
 *
 * Input URL format:
 *   https://docs.google.com/spreadsheets/d/{ID}/edit#gid={GID}
 *
 * Output:
 *   { rows: Array<{ key: string; value: string }> }
 */
export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  // Convert edit URL → CSV export URL
  // e.g. .../edit#gid=123 → .../export?format=csv&gid=123
  const csvUrl = rawUrl
    .replace(/\/edit.*$/, "")
    .replace(/\/view.*$/, "") + "/export?format=csv" +
    (rawUrl.includes("gid=") ? "&gid=" + rawUrl.split("gid=")[1].split("&")[0] : "");

  try {
    const res = await fetch(csvUrl, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Sheet not accessible" }, { status: 502 });
    }

    const text = await res.text();

    // Parse CSV into key-value rows
    // The sheet format is: key, value (with some rows having multi-line values)
    const rows: { key: string; value: string }[] = [];
    let currentKey = "";
    let currentValue = "";

    const lines = text.split("\n").map(l => l.trimEnd());

    for (const line of lines) {
      // Simple CSV split respecting quoted fields
      const cols = parseCSVLine(line);
      if (!cols || cols.length === 0) continue;

      const col0 = (cols[0] ?? "").trim();
      const col1 = (cols[1] ?? "").trim();

      if (col0) {
        // New key — save previous if any
        if (currentKey) {
          rows.push({ key: currentKey, value: currentValue.trim() });
        }
        currentKey = col0;
        currentValue = col1;
      } else if (col1 && currentKey) {
        // Continuation row (key is empty, value continues)
        currentValue += (currentValue ? "\n" : "") + col1;
      }
    }

    // Push last row
    if (currentKey) {
      rows.push({ key: currentKey, value: currentValue.trim() });
    }

    return NextResponse.json({ rows });
  } catch {
    return NextResponse.json({ error: "Failed to fetch sheet" }, { status: 500 });
  }
}

/** Minimal CSV line parser that handles quoted fields */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}
