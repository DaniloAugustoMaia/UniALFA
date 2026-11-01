import Link from "next/link";

const indicadores = [
  { titulo: "Vendas no mês", valor: "R$ 48.250", variacao: "+12,5%", positivo: true, icone: "$" },
  { titulo: "Pedidos", valor: "326", variacao: "+8,1%", positivo: true, icone: "▤" },
  { titulo: "Produtos ativos", valor: "128", variacao: "+3", positivo: true, icone: "▦" },
  { titulo: "Clientes", valor: "1.940", variacao: "-1,2%", positivo: false, icone: "♙" },
];

const vendasPorMes = [
  { mes: "Mai", valor: 32 },
  { mes: "Jun", valor: 38 },
  { mes: "Jul", valor: 35 },
  { mes: "Ago", valor: 42 },
  { mes: "Set", valor: 44 },
  { mes: "Out", valor: 48 },
];

const ultimosPedidos = [
  { id: "#1042", cliente: "Mariana Oliveira", valor: "R$ 389,90", status: "Pago" },
  { id: "#1041", cliente: "Lucas Santos", valor: "R$ 1.249,00", status: "Pendente" },
  { id: "#1040", cliente: "Camila Rocha", valor: "R$ 89,50", status: "Pago" },
  { id: "#1039", cliente: "Rafael Lima", valor: "R$ 654,30", status: "Cancelado" },
];

const estiloStatus: Record<string, string> = {
  Pago: "bg-emerald-50 text-emerald-700",
  Pendente: "bg-amber-50 text-amber-700",
  Cancelado: "bg-red-50 text-red-700",
};

export default function Dashboard() {
  const maximo = Math.max(...vendasPorMes.map((item) => item.valor));

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-blue-600">
            VISÃO GERAL
          </p>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe os principais números do seu negócio.
          </p>
        </div>

        <Link
          href="/produtos"
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ver produtos →
        </Link>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {indicadores.map((item) => (
          <div
            key={item.titulo}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{item.titulo}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                {item.icone}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold">{item.valor}</p>
            <p
              className={`mt-1 text-xs font-semibold ${
                item.positivo ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {item.variacao} <span className="font-normal text-slate-400">vs. mês anterior</span>
            </p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
          <h2 className="font-bold">Vendas por mês</h2>
          <p className="text-sm text-slate-500">Valores em milhares de reais.</p>

          <div className="mt-6 flex h-48 items-end gap-3">
            {vendasPorMes.map((item) => (
              <div
                key={item.mes}
                className="flex h-full flex-1 items-end justify-center"
              >
                <div
                  className="w-full max-w-12 rounded-t-md bg-blue-600"
                  style={{ height: `${(item.valor / maximo) * 100}%` }}
                  title={`R$ ${item.valor} mil`}
                />
              </div>
            ))}
          </div>

          <div className="mt-2 flex gap-3 text-center text-xs text-slate-500">
            {vendasPorMes.map((item) => (
              <span key={item.mes} className="flex-1">
                {item.mes}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="font-bold">Últimos pedidos</h2>
          <p className="text-sm text-slate-500">Movimentações mais recentes.</p>

          <ul className="mt-4 divide-y divide-slate-100">
            {ultimosPedidos.map((pedido) => (
              <li
                key={pedido.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{pedido.cliente}</p>
                  <p className="text-xs text-slate-500">
                    {pedido.id} · {pedido.valor}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estiloStatus[pedido.status]}`}
                >
                  {pedido.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <div>
          <h2 className="font-bold text-blue-900">Catálogo de produtos</h2>
          <p className="text-sm text-blue-800/80">
            Consulte a lista completa de produtos cadastrados.
          </p>
        </div>
        <Link
          href="/produtos"
          className="rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          Abrir listagem
        </Link>
      </section>
    </div>
  );
}