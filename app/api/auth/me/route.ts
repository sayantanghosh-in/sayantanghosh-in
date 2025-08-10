import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("sayantanghosh-sb-access-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  // Validate token and get user
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json(
      { error: "Invalid or expired session" },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
