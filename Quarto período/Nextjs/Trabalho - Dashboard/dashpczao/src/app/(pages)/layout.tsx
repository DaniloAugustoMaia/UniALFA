"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";

const observar = () => () => {};
const estaLogado = () => sessionStorage.getItem("logado") === "true";
const noServidor = () => null;

export default function PagesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const logado = useSyncExternalStore(observar, estaLogado, noServidor);

  useEffect(() => {
    if (logado === false) {
      router.replace("/login");
    }
  }, [logado, router]);

  if (logado !== true) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}