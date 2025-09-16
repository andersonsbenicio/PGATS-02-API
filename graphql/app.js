// Configuração do ApolloServer e Express para GraphQL
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const auth = require("./auth");

const app = express();
app.use(express.json());

// Middleware de autenticação para Mutations protegidas
app.use(auth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ token: req.token }),
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

module.exports = app; // Para testes com Supertest
