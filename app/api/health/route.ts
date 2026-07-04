// app/api/health/route.ts
import { NextResponse } from "next/server";

// GET handler
export async function GET() {
    return NextResponse.json(
    { message: "Up and running 🏃", timestamp: Date.now() },
    {
      status: 200,
    }
  );
}
