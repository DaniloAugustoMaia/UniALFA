
import { z } from "zod";

export function somenteNumeros(valor = "") {
  return valor.replace(/\D/g, "");
}

export function mascaraCPF(valor = "") {
  return somenteNumeros(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function mascaraTelefone(valor = "") {
  const n = somenteNumeros(valor).slice(0, 11);

  if (n.length <= 10) {
    return n
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return n
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function mascaraCEP(valor = "") {
  return somenteNumeros(valor)
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function mascaraData(valor = "") {
  return somenteNumeros(valor)
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

function cpfValido(cpf) {
  const n = somenteNumeros(cpf);

  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) {
    return false;
  }

  let soma = 0;

  for (let i = 0; i < 9; i++) {
    soma += Number(n[i]) * (10 - i);
  }

  let digito = (soma * 10) % 11;
  if (digito === 10) digito = 0;

  if (digito !== Number(n[9])) return false;

  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += Number(n[i]) * (11 - i);
  }

  digito = (soma * 10) % 11;
  if (digito === 10) digito = 0;

  return digito === Number(n[10]);
}

function dataValida(valor) {
  const partes = valor.split("/");

  if (partes.length !== 3) return false;

  const [dia, mes, ano] = partes.map(Number);

  if (!dia || !mes || !ano || ano < 1900) return false;

  const data = new Date(ano, mes - 1, dia);

  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia &&
    data <= new Date()
  );
}

export const usuarioSchema = z.object({
  nome: z.string().trim().min(3, "Informe o nome completo."),
  cpf: z.string().refine(cpfValido, "CPF inválido."),
  email: z.string().trim().email("Informe um e-mail válido."),
  telefone: z.string().refine(
    (v) => [10, 11].includes(somenteNumeros(v).length),
    "Informe um telefone válido."
  ),
  nascimento: z.string().refine(
    dataValida,
    "Informe uma data válida no formato DD/MM/AAAA."
  ),
  cep: z.string().refine(
    (v) => somenteNumeros(v).length === 8,
    "Informe um CEP com 8 dígitos."
  ),
  rua: z.string().trim().min(2, "Informe a rua."),
  numero: z.string().trim().min(1, "Informe o número."),
  bairro: z.string().trim().min(2, "Informe o bairro."),
  cidade: z.string().trim().min(2, "Informe a cidade."),
  estado: z.string().length(2, "Informe a UF com duas letras."),
  senha: z.string().optional().default("")
});
