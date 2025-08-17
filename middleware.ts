import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Allow all OPTIONS requests to pass through without authentication check
  if (req.method === "OPTIONS") {
    return NextResponse.next();
  }

  const token = req.cookies.get("sayantanghosh-sb-access-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

// 👇 matcher decides which routes are protected
export const config = {
  matcher: [
    "/api/expenses",
    "/api/expenses/:path*",
    "/api/expenses-category/:path*",
  ],
};
