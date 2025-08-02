import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { allowedOrigins } from "@/lib/cors";

export async function POST(req: NextRequest) {
  const { email, password, redirect_url } = await req.json();

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return NextResponse.json(
      { error: error?.message || "Login failed" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ message: "Logged in", redirect_url });

  res.cookies.set({
    name: "sayantanghosh-sb-access-token",
    value: data.session.access_token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    domain:
      process.env.NODE_ENV === "production"
        ? ".sayantanghosh.in"
        : allowedOrigins?.[0]?.split("http://")?.[1], // important
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
