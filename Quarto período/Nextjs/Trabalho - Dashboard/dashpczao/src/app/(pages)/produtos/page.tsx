"use client";

import Link from "next/link";
import { useState } from "react";

const produtos = [
  { id: 1, nome: "Notebook Pro 14\"", categoria: "Informática", preco: 5499.9, estoque: 14 },
  { id: 2, nome: "Mouse sem fio", categoria: "Periféricos", preco: 89.9, estoque: 62 },
  { id: 3, nome: "Teclado mecânico", categoria: "Periféricos", preco: 349.0, estoque: 8 },
  { id: 4, nome: "Monitor 27\" 4K", categoria: "Informática", preco: 2199.0, estoque: 0 },
  { id: 5, nome: "Headset gamer", categoria: "Áudio", preco: 279.9, estoque: 31 },
  { id: 6, nome: "Caixa de som Bluetooth", categoria: "Áudio", preco: 199.9, estoque: 5 },
  { id: 7, nome: "Webcam Full HD", categoria: "Periféricos", preco: 249.0, estoque: 22 },
  { id: 8, nome: "SSD 1 TB", categoria: "Informática", preco: 459.9, estoque: 40 },
  { id: 9, nome: "Smartphone 128 GB", categoria: "Celulares", preco: 1899.0, estoque: 17 },
  { id: 10, nome: "Carregador turbo 30W", categoria: "Celulares", preco: 119.9, estoque: 0 },
];

const categorias = ["Todas", ...new Set(produtos.map((p) => p.categoria))];

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function situacao(estoque: number) {
  if (estoque === 0) {
    return { texto: "Esgotado", estilo: "bg-red-50 text-red-700" };
  }
  if (estoque <= 10) {
    return { texto: "Estoque baixo", estilo: "bg-amber-50 text-amber-700" };
  }
  return { texto: "Em estoque", estilo: "bg-emerald-50 text-emerald-700" };
}

export default function Produtos() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const filtrados = produtos.filter((produto) => {
    const combinaNome = produto.nome
      .toLowerCase()
      .includes(busca.trim().toLowerCase());
    const combinaCategoria =
      categoria === "Todas" || produto.categoria === categoria;

    return combinaNome && combinaCategoria;
  });

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Voltar ao dashboard
        </Link>
        <p className="mt-3 text-xs font-bold tracking-widest text-blue-600">
          CATÁLOGO
        </p>
        <h1 className="text-3xl font-bold">Produtos</h1>
        <p className="mt-1 text-sm text-slate-500">
          Consulte os produtos cadastrados e a situação do estoque.
        </p>
      </header>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto pelo nome..."
            className="min-w-56 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            {categorias.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {filtrados.length} produto(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Produto</th>
                <th className="px-4 py-3 font-semibold">Categoria</th>
                <th className="px-4 py-3 font-semibold">Preço</th>
                <th className="px-4 py-3 font-semibold">Estoque</th>
                <th className="px-4 py-3 font-semibold">Situação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtrados.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filtrados.map((produto) => {
                  const estado = situacao(produto.estoque);

                  return (
                    <tr key={produto.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold">
                        {produto.nome}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {produto.categoria}
                      </td>
                      <td className="px-4 py-3">
                        {formatarPreco(produto.preco)}
                      </td>
                      <td className="px-4 py-3">{produto.estoque} un.</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estado.estilo}`}
                        >
                          {estado.texto}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          Exibindo {filtrados.length} de {produtos.length} produtos
        </div>
      </section>
    </div>
  );
}