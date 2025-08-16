import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sayantanghosh-sb-access-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  // ✅ Cookie present, let it through
  return NextResponse.next();
}

// 👇 matcher decides which routes are protected
export const config = {
  matcher: ["/api/expenses/:path*"],
};
