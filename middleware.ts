import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SALT = "arabic-affiliate-admin-salt-v1";

async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and API routes
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/")
  ) {
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

    const expectedToken = await sha256(adminPassword + SALT);
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
