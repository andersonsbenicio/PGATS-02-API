// In-memory user database
const users = [
  {
    username: "eustaquio",
    password: "123456",
    isFavored: ["crispiniana"],
    saldo: 1000,
  },
  {
    username: "crispiniana",
    password: "123456",
    favorecidos: ["eustaquio"],
    saldo: 1000,
  },
];

module.exports = {
  users,
};
