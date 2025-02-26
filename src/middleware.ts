import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request: NextRequest) {
  // const token = request.cookies.get("token")?.value;
  // const { pathname } = request.nextUrl;

  // const isAuthenticated = !!token;

  // if (!isAuthenticated && pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Se o usuário está logado e tenta acessar /login, redireciona para /home
  // if (pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // Se nada disso se aplicar, segue normalmente
  return NextResponse.next();
}

// Configurando em quais rotas o middleware roda
export const config = {
  // Aqui estamos aplicando o middleware a todas as rotas, exceto:
  // - _next (arquivos internos do Next)
  // - arquivos estáticos (favicon.ico, imagens, etc.)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
