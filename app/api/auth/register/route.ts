import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, display_name } = body;

    // Validate required fields
    if (!email || !password || !display_name) {
      return NextResponse.json(
        { error: "Email, name and password are required" },
        { status: 400 }
      );
    }

    // Create user in Supabase Auth
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          display_name,
        },
        email_confirm: true,
      });

    if (userError || !userData?.user) {
      console.error("User create error:", userError);
      return NextResponse.json(
        { error: userError?.message || "Registration failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
