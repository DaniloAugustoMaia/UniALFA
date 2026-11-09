import { SignJWT, jwtVerify } from "jose";

export const COOKIE_TOKEN = "token";
export const DURACAO_SEGUNDOS = 60 * 60;

function chave() {
  const segredo = process.env.AUTH_SECRET;

  if (!segredo) {
    throw new Error("Defina AUTH_SECRET no arquivo .env.local");
  }

  return new TextEncoder().encode(segredo);
}

export async function criarToken(usuario) {
  return new SignJWT({ nome: usuario.nome, email: usuario.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(usuario.id))
    .setIssuedAt()
    .setExpirationTime(`${DURACAO_SEGUNDOS}s`)
    .sign(chave());
}

export async function verificarToken(token) {
  const segredo = chave();

  try {
    const { payload } = await jwtVerify(token, segredo);
    return payload;
  } catch {
    return null;
  }
}
