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

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers = getCorsHeaders(origin);
  const { email, password, redirect_url } = await req.json();

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return NextResponse.json(
      { error: error?.message || "Login failed" },
      { status: 401, headers }
    );
  }

  const res = NextResponse.json(
    {
      message: "Logged in",
      redirect_url,
    },
    {
      status: 200,
      headers,
    }
  );

  const isProduction = process.env.NODE_ENV === "production";
  // Conditionally set the secure and domain flags
  res.cookies.set({
    name: "sayantanghosh-sb-access-token",
    value: data.session.access_token,
    httpOnly: true,
    secure: isProduction, // Set to true only in production
    sameSite: "strict",
    // Omit the domain in development to avoid issues with localhost
    domain: isProduction ? ".sayantanghosh.in" : undefined,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
