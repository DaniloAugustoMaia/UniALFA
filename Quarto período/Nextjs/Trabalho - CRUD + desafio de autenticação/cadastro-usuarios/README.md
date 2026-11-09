# Cadastro de Usuários
🇬🇧 [Read in English](#user-registration)

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

## Autenticação e rotas protegidas (desafio)

O sistema exige **login com token de acesso**: somente usuários autenticados acessam as páginas internas.

- O login (`/login`) confere o e-mail e a senha com os usuários do `db.json`.
- Se estiverem corretos, a rota `/api/login` gera um **token JWT** (assinado, válido por 1 hora) e o guarda em um **cookie `httpOnly`**.
- O arquivo `src/proxy.js` roda antes de cada página: sem token válido, o usuário é redirecionado para `/login`.
- O botão **Sair** apaga o token.

### Configuração
Crie o arquivo `.env.local` a partir do exemplo e troque a chave por uma sua:

```bash
cp .env.example .env.local
```

No PowerShell: `Copy-Item .env.example .env.local`

### Como testar
Suba a API (`npm run dev:api`) e o projeto (`npm run dev`). Entre com um usuário do `db.json` (por exemplo, `mariana@example.com`). Para ver a proteção, abra `http://localhost:3000` em uma aba anônima: você será levado ao login.

> **Limites:** as senhas do `db.json` estão em texto puro e o JSON Server (porta 3001) não exige token, pois é apenas um backend simulado para fins didáticos. A proteção cobre as páginas do sistema.

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


---

# User Registration

User management system (CRUD) built with **Next.js**, as an assignment for the Next.js course of the Internet Systems Technology program (UniALFA, 4th semester).

> **Academic assignment:** work proposed by the professor, due on **October 26, 2026**.

## Features

- **Listing** of users in a table, with counters and search by name, e-mail or CPF
- **Registration** of users through a form (personal data, address and password)
- **Editing** of existing users (the password is optional: if left empty, the current one is kept)
- **Deletion** of users, with confirmation
- **Input masks** for CPF, phone, ZIP code (CEP) and date of birth
- **Validation** with an error message on each field:
  - full name (at least 3 characters)
  - valid CPF (checks the verification digits)
  - e-mail in a valid format
  - phone with 10 or 11 digits
  - real date of birth, in DD/MM/YYYY format and not in the future
  - ZIP code (CEP) with 8 digits
  - state code (UF) with 2 letters
  - password with at least 8 characters

## Authentication and protected routes (challenge)

The system requires **login with an access token**: only authenticated users can reach the internal pages.

- The login page (`/login`) checks the e-mail and password against the users in `db.json`.
- If they match, the `/api/login` route creates a **JWT token** (signed, valid for 1 hour) and stores it in an **`httpOnly` cookie**.
- The `src/proxy.js` file runs before every page: without a valid token, the user is redirected to `/login`.
- The **Sair** (log out) button deletes the token.

### Setup
Create the `.env.local` file from the example and replace the key with your own:

```bash
cp .env.example .env.local
```

On PowerShell: `Copy-Item .env.example .env.local`

### How to test
Start the API (`npm run dev:api`) and the project (`npm run dev`). Sign in with a user from `db.json` (for example, `mariana@example.com`). To see the protection, open `http://localhost:3000` in an incognito tab: you will be taken to the login page.

> **Limitations:** the passwords in `db.json` are stored in plain text and JSON Server (port 3001) does not require a token, since it is only a simulated backend for educational purposes. The protection covers the system's pages.

## Technologies

- [Next.js](https://nextjs.org/) (App Router) and React
- [Zod](https://zod.dev/) for the validation schema
- [JSON Server](https://github.com/typicode/json-server) to simulate the backend (REST API)
- Plain CSS (`globals.css`)

## How to run

Prerequisite: [Node.js](https://nodejs.org/) installed.

```bash
# 1. Install dependencies
npm install

# 2. Terminal 1: start the API (JSON Server) on port 3001
npm run dev:api

# 3. Terminal 2: start Next.js
npm run dev
```

Open **http://localhost:3000**.

> On Windows PowerShell, if you get the "script execution is disabled" error, use `npm.cmd` instead of `npm`.

## Structure

```
cadastro-usuarios/
├── db.json                  # simulated database (JSON Server)
└── src/
    ├── app/
    │   ├── page.jsx         # main screen: listing, form and CRUD
    │   ├── layout.js        # root layout and metadata
    │   └── globals.css      # application styles
    └── lib/
        └── validacoes.js    # Zod schema and CPF/date validation
```

## Endpoints used (JSON Server)

| Method | Route            | Action          |
| ------ | ---------------- | --------------- |
| GET    | `/usuarios`      | List users      |
| POST   | `/usuarios`      | Create user     |
| PUT    | `/usuarios/:id`  | Update user     |
| DELETE | `/usuarios/:id`  | Delete user     |

## Notes

- The data in `db.json` is fictional and for demonstration only.
- Passwords are stored **without encryption**, since JSON Server is only a simulated backend for educational purposes. In a real system, passwords must be hashed and handled on the server.
- The professor's extra authentication challenge (due on November 8, 2026) will be developed next.

## Author

**Danilo Augusto Maia**, student of Internet Systems Technology (UniALFA).
