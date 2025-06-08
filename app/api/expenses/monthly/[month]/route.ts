import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _: Request,
  { params }: { params: { month: string } }
) {
  if (
    !params?.month ||
    !(parseInt(params?.month) > 0 && parseInt(params?.month) < 13)
  ) {
    return NextResponse.json(
      { error: "Invalid month number. Month number should be >= 1 and <= 12" },
      { status: 400 }
    );
  }

  const monthNumber = parseInt(params?.month);

  const { data, error } = await supabase.rpc("get_expenses_by_month", {
    month_number: monthNumber,
  });

  if (error) {
    console.error("RPC error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
