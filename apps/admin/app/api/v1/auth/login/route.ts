import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username/Email and Password are required." },
        { status: 400 }
      );
    }

    const trimmedUser = username.trim().toLowerCase();

    // Read Admin Credentials from environment variables (.env)
    const ismailUser = (process.env.ADMIN_ISMAIL_USER || "ismail@alarabi.com").toLowerCase();
    const ismailPass = process.env.ADMIN_ISMAIL_PASS || "123456";

    const farhanUser = (process.env.ADMIN_FARHAN_USER || "farhan@alarabi.com").toLowerCase();
    const farhanPass = process.env.ADMIN_FARHAN_PASS || "123456";

    // 1. Super Admin: Ismail
    if (
      (trimmedUser === "ismail" || trimmedUser === ismailUser) &&
      password === ismailPass
    ) {
      return NextResponse.json({
        success: true,
        session: {
          email: "ismail@alarabi.com",
          name: "Ismail",
          role: "SUPER_ADMIN",
        },
      });
    }

    // 2. Content Creator: Farhan
    if (
      (trimmedUser === "farhan" || trimmedUser === farhanUser) &&
      password === farhanPass
    ) {
      return NextResponse.json({
        success: true,
        session: {
          email: "farhan@alarabi.com",
          name: "Farhan",
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid username/email or password." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Authentication failed." },
      { status: 500 }
    );
  }
}
