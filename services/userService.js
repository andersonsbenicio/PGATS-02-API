const { users } = require("../models/userModel");

function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

function registerUser({ username, password, isFavored = [] }) {
  if (findUserByUsername(username)) {
    throw new Error("Usuário já existe");
  }
  const user = { username, password, isFavored, saldo: 1000 };
  users.push(user);
  return { username, isFavored, saldo: user.saldo };
}

function authenticateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user) throw new Error("Usuário não encontrado");
  if (user.password !== password) {
    throw new Error("Senha inválida");
  }
  return {
    username: user.username,
    isFavored: user.isFavored,
    saldo: user.saldo,
  };
}

function getAllUsers() {
  return users.map((u) => ({
    username: u.username,
    isFavored: u.isFavored,
    saldo: u.saldo,
  }));
}

module.exports = {
  findUserByUsername,
  registerUser,
  authenticateUser,
  getAllUsers,
};
