## Tecnologias Utilizadas

- Node.js
- Express
- Apollo Server (GraphQL)
- Swagger (documentação)

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```bash
   npm install express@4 apollo-server-express@3 graphql jsonwebtoken dotenv
   ```

## Como Executar

### API REST

- Para rodar a API REST:
  ```bash
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`.
- A documentação Swagger estará disponível em `http://localhost:3000/api-docs`.

### API GraphQL

- Para rodar a API GraphQL:
  ```bash
  node graphql/server.js
  ```
- A API GraphQL estará disponível em `http://localhost:4000/graphql`.

## Configuração

Antes de seguir, crie um arquivo .env na pasta raiz contendo as propriedades BASE_URL_REST, BASE_URL_GRAPHQL e JWT_SECRET, com a URL desses serviços e a chave secreta do JWT.

# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários. O objetivo é servir de base para estudos de testes e automação de APIs.

## Tecnologias Utilizadas

- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Como Executar

- Para rodar a API:
  ```bash
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`.
- A documentação Swagger estará disponível em `http://localhost:3000/api-docs`.

## Configuração

Antes de seguir, crie um arquivo .env na pasta raiz contendo as propriedades BASE_URL_REST E BASE_URL_GRAPHQL, com a URL desses serviços.

## Endpoints

### Usuários

- `POST /users/register` — Registra um novo usuário. Campos: `username`, `password`, `isFavored` (opcional, booleano).
- `POST /users/login` — Realiza login. Campos: `username`, `password`.
- `GET /users` — Lista todos os usuários.

### Transferências

## GraphQL Schema (Exemplo)

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  token: String
}

type Transfer {
  id: ID!
  fromAccount: String!
  toAccount: String!
  amount: Float!
  status: String!
  createdAt: String!
}

type Query {
  getTransfers: [Transfer]
  getUser(id: ID!): User
}

type Mutation {
  login(email: String!, password: String!): User
  createTransfer(
    fromAccount: String!
    toAccount: String!
    amount: Float!
  ): Transfer
}
```

## Autenticação nas Mutations

Para criar uma transferência, é necessário enviar o token JWT no header Authorization:

```
Authorization: Bearer <seu_token_jwt>
```

O token é obtido via mutation de login.

## Testes

Para testar a API GraphQL com Supertest, importe o arquivo `graphql/app.js`.

- `POST /transfers` — Realiza uma transferência. Campos: `from`, `to`, `amount` (número).
- `GET /transfers` — Lista todas as transferências.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Testes

- O arquivo `app.js` exporta o app Express sem o método `listen()`, facilitando testes com Supertest.

## Observações

- O banco de dados é em memória, os dados são perdidos ao reiniciar a aplicação.
- Para dúvidas, consulte a documentação Swagger em `/api-docs`.
