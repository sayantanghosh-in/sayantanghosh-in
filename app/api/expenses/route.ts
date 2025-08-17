// app/api/expenses/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCorsHeaders } from "@/lib/cors";

// Preflight handler
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin, "DELETE, GET, OPTIONS, POST, PUT");

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

// Create a new expense
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin);
  const body = await req.json();

  const { data, error } = await supabase.from("expenses").insert(body).select();

  if (error) {
    console.error("POST error:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return NextResponse.json({ data }, { status: 201, headers });
}

// Update an existing expense by ID
export async function PUT(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin);
  const body = await req.json();

  const { id, ...updates } = body;

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: "Expense ID is required." }),
      {
        status: 400,
        headers,
      }
    );
  }

  const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("PUT error:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return NextResponse.json({ data }, { status: 200, headers });
}

// Delete an expense by ID
export async function DELETE(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin);
  const { id } = await req.json();

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: "Expense ID is required." }),
      {
        status: 400,
        headers,
      }
    );
  }

  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    console.error("DELETE error:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}
