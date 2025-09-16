// Types, Queries e Mutations baseados nos testes REST e fixtures
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    isFavored: [String]
    saldo: Float!
    token: String
  }

  type Transfer {
    from: String!
    to: String!
    amount: Float!
    date: String!
  }

  type Query {
    getTransfers: [Transfer]
    getUsers: [User]
  }

  type Mutation {
    login(username: String!, password: String!): User
    registerUser(
      username: String!
      password: String!
      isFavored: [String]
    ): User
    createTransfer(from: String!, to: String!, amount: Float!): Transfer
  }
`;

module.exports = typeDefs;
