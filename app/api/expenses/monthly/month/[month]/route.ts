import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Context = {
  params: Promise<{
    month: string;
  }>;
};

export async function GET(req: NextRequest, context: Context) {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
