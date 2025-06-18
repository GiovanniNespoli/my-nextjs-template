import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ["/", "/signUp"];

  const isPublicPath = publicPaths.find((path) => pathname === path);
  if (isPublicPath) {
    return NextResponse.next();
  }
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!token) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
