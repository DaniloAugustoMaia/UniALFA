import { NextResponse } from "next/server";
import { COOKIE_TOKEN, verificarToken } from "./lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_TOKEN)?.value;
  const autenticado = token ? Boolean(await verificarToken(token)) : false;

  if (pathname === "/login") {
    if (autenticado) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!autenticado) {
    const resposta = NextResponse.redirect(new URL("/login", request.url));

    if (token) {
      resposta.cookies.delete(COOKIE_TOKEN);
    }

    return resposta;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};