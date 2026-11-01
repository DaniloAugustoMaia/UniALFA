# DashPro (Painel de Gestão)

🇬🇧 [Read in English](#dashpro-english)

Painel de gestão desenvolvido em **Next.js**, como trabalho da disciplina de Next.js do curso de Tecnologia em Sistemas para Internet (UniALFA, 4º período).

> **Atividade acadêmica:** trabalho proposto pelo professor em **19/10/2026**, no formato de hackathon: tela de login, tela de dashboard e uma tela de listagem acessada por um link dentro do dashboard.

## Funcionalidades

- **Login** com validação dos campos e mensagem de erro para credenciais incorretas
- **Dashboard** com indicadores, gráfico de vendas por mês e últimos pedidos
- **Link no dashboard** que leva à tela de listagem
- **Listagem de produtos** com busca por nome, filtro por categoria e situação do estoque
- **Menu lateral** com destaque da página atual e botão **Sair**
- **Proteção das telas:** quem não fez login é redirecionado para `/login`
- Layout responsivo

## Acesso de demonstração

| E-mail            | Senha  |
| ----------------- | ------ |
| admin@email.com   | 123456 |

## Tecnologias

- [Next.js](https://nextjs.org/) (App Router), React e TypeScript
- [Tailwind CSS](https://tailwindcss.com/) para a estilização

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Subir o projeto
npm run dev
```

Acesse **http://localhost:3000**. Não é necessário subir nenhuma API: os dados são fictícios e ficam no próprio código.

> No PowerShell do Windows, se aparecer o erro de "execução de scripts desabilitada", use `npm.cmd` no lugar de `npm`.

## Rotas

| Rota         | Tela                                      |
| ------------ | ----------------------------------------- |
| `/`          | Redireciona para o login                  |
| `/login`     | Login                                     |
| `/dashboard` | Dashboard (requer login)                  |
| `/produtos`  | Listagem de produtos (requer login)       |

## Estrutura

```
dashpczao/
└── src/
    ├── app/
    │   ├── page.tsx               # redireciona para /login
    │   ├── layout.tsx             # layout raiz e metadados
    │   ├── globals.css
    │   ├── login/
    │   │   └── page.tsx           # tela de login
    │   └── (pages)/
    │       ├── layout.tsx         # menu lateral e proteção das telas
    │       ├── dashboard/page.tsx # tela do dashboard
    │       └── produtos/page.tsx  # tela de listagem
    └── components/
        └── Sidebar.tsx            # menu lateral
```

## Observações

- A autenticação é **simulada no navegador** (o login é guardado no `sessionStorage`), apenas para fins didáticos. Em um sistema real, a verificação de credenciais e a sessão devem ser feitas no servidor.
- Todos os dados exibidos (vendas, pedidos, produtos) são fictícios.

## Autor

**Danilo Augusto Maia**, estudante de Tecnologia em Sistemas para Internet (UniALFA).

---

# DashPro (English)

Management dashboard built with **Next.js**, as an assignment for the Next.js course of the Internet Systems Technology program (UniALFA, 4th semester).

> **Academic assignment:** work proposed by the professor on **October 19, 2026**, in a hackathon format: a login screen, a dashboard screen, and a listing screen reached through a link inside the dashboard.

## Features

- **Login** with field validation and an error message for wrong credentials
- **Dashboard** with indicators, a monthly sales chart and latest orders
- **Link in the dashboard** leading to the listing screen
- **Product listing** with search by name, category filter and stock status
- **Sidebar** highlighting the current page, with a **Log out** button
- **Protected screens:** users who are not logged in are redirected to `/login`
- Responsive layout

## Demo access

| E-mail            | Password |
| ----------------- | -------- |
| admin@email.com   | 123456   |

## Technologies

- [Next.js](https://nextjs.org/) (App Router), React and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling

## How to run

Prerequisite: [Node.js](https://nodejs.org/) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the project
npm run dev
```

Open **http://localhost:3000**. No API is required: all data is fictional and lives in the code itself.

> On Windows PowerShell, if you get the "script execution is disabled" error, use `npm.cmd` instead of `npm`.

## Routes

| Route        | Screen                                    |
| ------------ | ----------------------------------------- |
| `/`          | Redirects to the login                    |
| `/login`     | Login                                     |
| `/dashboard` | Dashboard (login required)                |
| `/produtos`  | Product listing (login required)          |

## Structure

```
dashpczao/
└── src/
    ├── app/
    │   ├── page.tsx               # redirects to /login
    │   ├── layout.tsx             # root layout and metadata
    │   ├── globals.css
    │   ├── login/
    │   │   └── page.tsx           # login screen
    │   └── (pages)/
    │       ├── layout.tsx         # sidebar and screen protection
    │       ├── dashboard/page.tsx # dashboard screen
    │       └── produtos/page.tsx  # listing screen
    └── components/
        └── Sidebar.tsx            # sidebar menu
```

## Notes

- Authentication is **simulated in the browser** (the login is stored in `sessionStorage`) for educational purposes only. In a real system, credential checks and sessions must be handled on the server.
- All displayed data (sales, orders, products) is fictional.

## Author

**Danilo Augusto Maia**, student of Internet Systems Technology (UniALFA).
