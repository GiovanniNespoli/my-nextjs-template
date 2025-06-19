import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { adminPaths, publicPaths } from "./app/core/utils/pathRoles";
import { UserRoleEnum } from "./app/(modules)/(private)/user/interface/IUser";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  console.log("token role", token.role);

  if (token.role !== UserRoleEnum.ADMIN) {
    const isAdminPath = adminPaths.find((path) => pathname === path);

    if (isAdminPath)
      return NextResponse.redirect("http://localhost:3000/not-found");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
