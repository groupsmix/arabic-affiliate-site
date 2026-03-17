import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return NextResponse.json({ message: "Admin not configured" }, { status: 503 });
  }

  const cookie = request.cookies.get("admin_token")?.value;
  if (cookie === adminSecret) {
    return NextResponse.next();
  }

  const param = request.nextUrl.searchParams.get("token");
  if (param === adminSecret) {
    const response = NextResponse.redirect(
      new URL(request.nextUrl.pathname, request.url)
    );
    response.cookies.set("admin_token", adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export const config = {
  matcher: ["/admin/:path*"],
};
