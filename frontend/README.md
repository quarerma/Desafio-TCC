Sistema de Tarefas UFJF

Este é um sistema simples de gerenciamento de tarefas com frontend em React (Vite) e backend em NestJS. Ele simula autenticação e manipulação de tarefas utilizando dados temporários, sem persistência em banco de dados.

Tecnologias Utilizadas

- Frontend: React + Vite
- Backend: NestJS
- ORM: Prisma (não funcional neste momento)

---

Como rodar o projeto

Backend (NestJS)

1. Acesse a pasta do backend:

   cd backend

2. Instale as dependências:

   npm install

3. Inicie o servidor:

   npm run start:dev

   O backend será iniciado em http://localhost:3000

Importante: O código do Prisma ORM está presente, mas não está funcional neste momento, pois não há conexão com banco de dados. Todos os dados (usuários e tarefas) são simulados em memória. Portanto, o cadastro de novos usuários está desativado para evitar inconsistências ao recarregar a página.

---

Frontend (React + Vite)

1. Acesse a pasta do frontend:

   cd frontend

2. Instale as dependências:

   npm install

3. Crie um arquivo .env na raiz da pasta frontend com o seguinte conteúdo:

   VITE_API_URL=http://localhost:3000

4. Inicie a aplicação:

   npm run dev

   A aplicação será aberta em http://localhost:5173

---

Logins Disponíveis

Como não há persistência de dados, os seguintes usuários estão disponíveis para login:

Usuário 1

- Email: avaliador@ufjf.br
- Senha: senha123

Usuário 2

- Email: exemplo@ufjf.br
- Senha: senha123

---

Funcionalidades

- Login com usuários simulados
- Listagem de tarefas por usuário
- Criação e visualização de tarefas (temporárias)
- Dados são armazenados apenas em memória

---

Observações

- Como os dados são temporários e não há banco de dados, nenhuma informação será salva ao recarregar a página ou reiniciar o servidor.
- O cadastro de novos usuários está intencionalmente desabilitado para manter a consistência dos dados em memória.

---

Contribuição

Sinta-se à vontade para abrir issues ou pull requests com melhorias!
