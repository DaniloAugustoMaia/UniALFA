import { cookies } from "next/headers";
import { COOKIE_TOKEN } from "../../../lib/auth";

export async function POST() {
  const jar = await cookies();
  jar.delete(COOKIE_TOKEN);

  return Response.json({ ok: true });
}