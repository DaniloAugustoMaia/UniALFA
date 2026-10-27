Este repositório trata o trabalho do dia 26/10/2026 e o desafio extra do professor do dia 08/11/2026
This repository contains the work for the assignment due on October 26, 2026, as well as the extra challenge assigned by the professor, due on November 8, 2026.

Boa! 💙 Vamos deixar tudo organizado para colocares no README.md do projeto e saberes exatamente o que falta fazer quando voltares.

O commit já foi criado (af193df), então o teu progresso está guardado localmente. O próximo passo é terminar os testes e preparar a entrega.

Aqui está um texto pronto para colocares no README.md dentro da pasta cadastro-usuarios.

Escrita


Cadastro de Usuários — Next.js
Projeto acadêmico desenvolvido para a disciplina de desenvolvimento web, com o objetivo de implementar um sistema de gerenciamento de usuários utilizando Next.js e JSON Server.

Funcionalidades previstas
Listagem de usuários cadastrados.
Cadastro de novos usuários.
Edição dos dados de usuários existentes.
Exclusão de usuários com confirmação.
Pesquisa por nome, e-mail ou CPF.
Máscaras para CPF, telefone, CEP e data de nascimento.
Validação dos campos obrigatórios.
Validação de e-mail, CPF, telefone, CEP, data de nascimento e senha.
Interface administrativa responsiva em azul e branco.
Tecnologias utilizadas
Next.js
React
JavaScript
JSON Server
React Hook Form
Zod
CSS
Requisitos
Node.js e npm instalados.
Dependências do projeto instaladas com npm install.
Como executar o projeto
1. Instalar as dependências
Na pasta cadastro-usuarios, execute:


bash
npm install
2. Iniciar a API
Abra um terminal e execute:


bash
npm run dev:api
A API JSON Server estará disponível em:

http://localhost:3001/usuarios

3. Iniciar o Next.js
Abra outro terminal na pasta do projeto e execute:


bash
npm run dev
Acesse o sistema em:

http://localhost:3000

Verificação do projeto
Para verificar a compilação de produção:


bash
npm run build
Git
Commit registrado localmente:

af193df — feat: implementa painel de cadastro de usuarios

Entrega acadêmica
Antes da entrega, verificar o funcionamento das operações de cadastro, consulta, edição e exclusão, testar as validações e capturar as telas de listagem e formulário para envio ao professor.

Observação de segurança
O JSON Server é utilizado para simular uma API em ambiente acadêmico. Não utilizar dados pessoais reais nem armazenar senhas reais em texto simples. Esta implementação não deve ser utilizada em produção sem medidas adicionais de segurança.

O que falta fazer quando voltares
Checklist de conclusão
0 de 8


1. Confirmar os arquivos da página
Verificar se src/app/page.jsx é a página principal e se src/app/page.js foi removido para evitar conflito de rota.

2. Testar a compilação
Executar npm run build e corrigir eventuais erros.

3. Iniciar a API e o site
Executar npm run dev:api e npm run dev em dois terminais separados.

4. Testar o CRUD
Cadastrar um usuário fictício, editar, pesquisar e excluir.

5. Conferir as validações
Verificar CPF, telefone, CEP, data de nascimento, e-mail e senha. Confirmar que o CPF valida os dígitos verificadores.

6. Conferir o visual
Verificar o painel azul e branco, a tabela, o formulário e a versão para celular.

7. Tirar os prints
Capturar a listagem e o formulário de cadastro preenchido com dados fictícios, sem mostrar senhas.

8. Finalizar Git e entrega
Verificar git status, criar outro commit se houver alterações e enviar os prints ao professor conforme as instruções da atividade.
Atenção antes de fechares
O commit está guardado localmente; não precisas fazer git push agora se não quiseres publicar no GitHub.

Não apagues o ../README.md da pasta superior nem tentes restaurá-lo sem verificar por que foi removido.

O texto do README descreve as funcionalidades previstas; marca como concluídas apenas as que testares de verdade.

O prazo informado na atividade foi 26 de outubro, às 00h00. Como essa data já chegou, verifica com o professor se ainda é possível enviar os prints, caso ainda não tenhas feito a entrega.

Quando voltares, começa por executar npm run build e envia-me o resultado. Continuamos exatamente daí.