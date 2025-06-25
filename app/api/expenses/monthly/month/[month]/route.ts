import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCorsHeaders } from "@/lib/cors";

type Context = {
  params: Promise<{
    month: string;
  }>;
};

// Preflight handler
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin);

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

export async function GET(req: NextRequest, context: Context) {
  const headers = getCorsHeaders(origin);
  const month = (await context?.params)?.month;

  const monthNumber = parseInt(month);
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return NextResponse.json(
      { error: "Invalid month number. Month number should be >= 1 and <= 12" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.rpc("get_expenses_by_month", {
    month_number: monthNumber,
  });

  if (error) {
    console.error("RPC error:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return NextResponse.json({ data }, { status: 200 });
}
