import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000", "https://gotodash.vercel.app"];

export function handleCors(req: NextRequest): Headers {
  const origin = req.headers.get("origin") || "";
  const corsOrigin = allowedOrigins.includes(origin) ? origin : "";

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", corsOrigin);
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return headers;
}

export function handleOptions(req: NextRequest) {
  const headers = handleCors(req);
  return new NextResponse(null, {
    status: 204,
    headers,
  });
}
