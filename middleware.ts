import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page (API routes don't match the middleware matcher)
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!token || !adminPassword) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    const expectedToken = await generateToken(adminPassword);
    if (token !== expectedToken) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
