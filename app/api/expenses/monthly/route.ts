import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { handleCors, handleOptions } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET(req: NextRequest) {
  const headers = handleCors(req);
  const { data, error } = await supabase.rpc("get_current_month_expenses");

  if (error) {
    console.error("RPC error:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return NextResponse.json({ data }, { status: 200 });
}
