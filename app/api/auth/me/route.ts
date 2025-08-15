import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getCorsHeaders } from "@/lib/cors";

// Preflight handler
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin);

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin);
  const token = req.cookies.get("sayantanghosh-sb-access-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "No session found" },
      { status: 401, headers }
    );
  }

  // Validate token and get user
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json(
      { error: "Invalid or expired session" },
      { status: 401, headers }
    );
  }

  return NextResponse.json({ user }, { status: 200, headers });
}
