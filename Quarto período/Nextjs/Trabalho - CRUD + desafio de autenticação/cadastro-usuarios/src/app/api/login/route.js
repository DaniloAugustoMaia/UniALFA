import { cookies } from "next/headers";
import { COOKIE_TOKEN, DURACAO_SEGUNDOS, criarToken } from "../../../lib/auth";

const API = "http://localhost:3001/usuarios";

export async function POST(request) {
  let corpo;

  try {
    corpo = await request.json();
  } catch {
    return Response.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  const email = String(corpo.email ?? "").trim().toLowerCase();
  const senha = String(corpo.senha ?? "");

  if (!email || !senha) {
    return Response.json(
      { erro: "Informe o e-mail e a senha." },
      { status: 400 }
    );
  }

  let usuarios;

  try {
    const resposta = await fetch(API, { cache: "no-store" });

    if (!resposta.ok) throw new Error("API indisponível");

    usuarios = await resposta.json();
  } catch {
    return Response.json(
      {
        erro: "Não foi possível conectar à API. Verifique se o JSON Server está rodando.",
      },
      { status: 503 }
    );
  }

  const usuario = usuarios.find(
    (u) => u.email?.toLowerCase() === email && u.senha === senha
  );

  if (!usuario) {
    return Response.json(
      { erro: "E-mail ou senha incorretos." },
      { status: 401 }
    );
  }

  const token = await criarToken(usuario);
  const jar = await cookies();

  jar.set(COOKIE_TOKEN, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DURACAO_SEGUNDOS,
  });

  return Response.json({ nome: usuario.nome });
}