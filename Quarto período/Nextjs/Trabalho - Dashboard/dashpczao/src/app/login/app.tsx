"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const USUARIO_DEMO = { email: "admin@email.com", senha: "123456" };

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!email.trim() || !senha) {
      setErro("Informe o e-mail e a senha.");
      return;
    }

    if (
      email.trim().toLowerCase() !== USUARIO_DEMO.email ||
      senha !== USUARIO_DEMO.senha
    ) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    sessionStorage.setItem("logado", "true");
    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen bg-slate-50 text-slate-900 lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 to-indigo-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-3 text-xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            D
          </span>
          DashPro
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Gerencie tudo em um só painel.
          </h1>
          <p className="mt-4 max-w-md text-blue-100">
            Acompanhe os números do seu negócio e acesse seus cadastros de
            forma rápida e organizada.
          </p>
        </div>

        <p className="text-sm text-blue-200">
          Projeto acadêmico em Next.js · UniALFA
        </p>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Entrar</h2>
          <p className="mt-1 text-sm text-slate-500">
            Acesse o painel com o seu e-mail e senha.
          </p>

          <form onSubmit={entrar} noValidate className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErro("");
                }}
                placeholder="nome@email.com"
                autoComplete="username"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErro("");
                }}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {erro && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <strong className="text-slate-700">Acesso de demonstração:</strong>
            <br />
            E-mail: {USUARIO_DEMO.email}
            <br />
            Senha: {USUARIO_DEMO.senha}
          </div>
        </div>
      </section>
    </main>
  );
}