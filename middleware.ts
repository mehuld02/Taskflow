// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/login";

  // 1️⃣ If not logged in → force redirect to /login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ If logged in → validate token
  if (token) {
    try {
      await jwtVerify(token, secret);

      // already logged in but trying to open /login → send to dashboard
      if (isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("❌ Invalid token:", err);
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.set("token", "", { maxAge: -1, path: "/" }); // clear invalid token
      return res;
    }
  }

  return NextResponse.next();
}

// ✅ Apply middleware to ALL routes except static & api
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
