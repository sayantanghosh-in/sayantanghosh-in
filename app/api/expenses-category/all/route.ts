import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
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
  const { data, error } = await supabase.from("expenses_category").select("*");

  if (error) {
    console.error("RPC error:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return NextResponse.json({ data }, { status: 200, headers });
}
