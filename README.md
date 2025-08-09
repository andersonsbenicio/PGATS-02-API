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

## Endpoints

### Usuários

- `POST /users/register` — Registra um novo usuário. Campos: `username`, `password`, `isFavored` (opcional, booleano).
- `POST /users/login` — Realiza login. Campos: `username`, `password`.
- `GET /users` — Lista todos os usuários.

### Transferências

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
