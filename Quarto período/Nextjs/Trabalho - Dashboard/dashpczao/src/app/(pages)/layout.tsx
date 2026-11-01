import type { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}