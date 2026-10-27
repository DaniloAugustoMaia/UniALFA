# Cadastro de Usuários

Sistema de gerenciamento de usuários (CRUD) desenvolvido em **Next.js**, como trabalho da disciplina de Next.js do curso de Tecnologia em Sistemas para Internet (UniALFA, 4º período).

> **Atividade acadêmica:** trabalho proposto pelo professor, com entrega em **26/10/2026**.

## Funcionalidades

- **Listagem** de usuários em tabela, com contadores e busca por nome, e-mail ou CPF
- **Cadastro** de usuários por formulário (dados pessoais, endereço e senha)
- **Edição** de usuários já cadastrados (a senha é opcional: se ficar vazia, a atual é mantida)
- **Exclusão** de usuários, com confirmação
- **Máscaras** nos campos de CPF, telefone, CEP e data de nascimento
- **Validações** com mensagem de erro em cada campo:
  - nome completo (mínimo de 3 caracteres)
  - CPF válido (confere os dígitos verificadores)
  - e-mail em formato válido
  - telefone com 10 ou 11 dígitos
  - data de nascimento real, no formato DD/MM/AAAA e não futura
  - CEP com 8 dígitos
  - UF com 2 letras
  - senha com no mínimo 8 caracteres

## Tecnologias

- [Next.js](https://nextjs.org/) (App Router) e React
- [Zod](https://zod.dev/) para o schema de validação
- [JSON Server](https://github.com/typicode/json-server) para simular o backend (API REST)
- CSS puro (`globals.css`)

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Terminal 1: subir a API (JSON Server) na porta 3001
npm run dev:api

# 3. Terminal 2: subir o Next.js
npm run dev
```

Acesse **http://localhost:3000**.

> No PowerShell do Windows, se aparecer o erro de "execução de scripts desabilitada", use `npm.cmd` no lugar de `npm`.

## Estrutura

```
cadastro-usuarios/
├── db.json                  # banco de dados simulado (JSON Server)
└── src/
    ├── app/
    │   ├── page.jsx         # tela principal: listagem, formulário e CRUD
    │   ├── layout.js        # layout raiz e metadados
    │   └── globals.css      # estilos da aplicação
    └── lib/
        └── validacoes.js    # schema Zod e validação de CPF e data
```

## Endpoints utilizados (JSON Server)

| Método | Rota             | Ação                |
| ------ | ---------------- | ------------------- |
| GET    | `/usuarios`      | Listar usuários     |
| POST   | `/usuarios`      | Cadastrar usuário   |
| PUT    | `/usuarios/:id`  | Editar usuário      |
| DELETE | `/usuarios/:id`  | Excluir usuário     |

## Observações

- Os dados do `db.json` são fictícios, apenas para demonstração.
- As senhas são salvas **sem criptografia**, pois o JSON Server é só uma simulação de backend para fins didáticos. Em um sistema real, a senha deve ser tratada e armazenada com hash no servidor.
- O desafio extra de autenticação do professor (entrega em 08/11/2026) será desenvolvido na sequência.

## Autor

**Danilo Augusto Maia**, estudante de Tecnologia em Sistemas para Internet (UniALFA).
