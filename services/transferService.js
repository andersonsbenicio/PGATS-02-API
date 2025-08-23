const { users } = require("../models/userModel");
const { transfers } = require("../models/transferModel");

function transfer({ from, to, amount }) {
  const sender = users.find((u) => u.username === from);
  const recipient = users.find((u) => u.username === to);

  if (!sender || !recipient) {
    throw new Error("Usuário remetente ou destinatário não encontrado");
  }
  if (sender.saldo < amount) {
    throw new Error("Saldo insuficiente");
  }
  const isFavored = sender.isFavored && sender.isFavored.includes(to);
  if (!recipient.isFavored && amount >= 5000) {
    throw new Error(
      "Transferências acima de R$ 5.000,00 só são permitidas para favorecidos"
    );
  }
  sender.saldo -= amount;
  recipient.saldo += amount;
  const transferRecord = { from, to, amount, date: new Date() };
  transfers.push(transferRecord);
  return transferRecord;
}

function getTransfers() {
  return transfers;
}

module.exports = {
  transfer,
  getTransfers,
};
