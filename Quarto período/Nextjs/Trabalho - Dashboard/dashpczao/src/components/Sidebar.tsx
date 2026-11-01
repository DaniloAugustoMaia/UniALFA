"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const itens = [
  { href: "/dashboard", rotulo: "Dashboard", icone: "▦" },
  { href: "/produtos", rotulo: "Produtos", icone: "▤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function sair() {
    sessionStorage.removeItem("logado");
    router.push("/login");
  }

  return (
    <aside className="flex flex-col gap-6 bg-slate-900 p-4 text-slate-200 md:min-h-screen md:w-60 md:shrink-0">
      <div className="flex items-center gap-3 px-2 text-lg font-bold text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
          D
        </span>
        DashPro
      </div>

      <nav className="flex gap-1 md:flex-col">
        <p className="hidden px-2 pb-1 text-xs font-semibold tracking-wider text-slate-500 md:block">
          MENU PRINCIPAL
        </p>

        {itens.map((item) => {
          const ativo =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                ativo
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.icone}</span>
              {item.rotulo}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={sair}
        className="mt-auto flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
      >
        <span>⎋</span>
        Sair
      </button>
    </aside>
  );
}