// Resolvers para Queries e Mutations
const userService = require("../services/userService");
const transferService = require("../services/transferService");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    getTransfers: () => {
      return transferService.getTransfers();
    },
    getUsers: () => {
      return userService.getAllUsers();
    },
  },
  Mutation: {
    login: (_, { username, password }) => {
      const user = userService.authenticateUser(username, password);
      if (user) {
        user.token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET || "segredo_super_secreto",
          { expiresIn: "1h" }
        );
        return user;
      }
      throw new Error("Credenciais inválidas");
    },
    registerUser: (_, { username, password, isFavored }) => {
      return userService.registerUser({ username, password, isFavored });
    },
    createTransfer: (_, { from, to, amount }, context) => {
      if (!context.token) throw new Error("Authentication required");
      try {
        jwt.verify(
          context.token,
          process.env.JWT_SECRET || "segredo_super_secreto"
        );
      } catch (err) {
        throw new Error("Token inválido");
      }
      try {
        return transferService.transfer({ from, to, amount });
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
