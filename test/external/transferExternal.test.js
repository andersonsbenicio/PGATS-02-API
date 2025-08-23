// Bibliotecas
const request = require("supertest");
const { expect } = require("chai");

//Testes
describe("Transfer", () => {
  describe("POST /transfers", () => {
    it("Quando informo remetente e destinatário inexistentes recebo 400", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/transfers")
        .send({
          from: "eustaquio",
          to: "crispiniana",
          amount: 100,
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Usuário remetente ou destinatário não encontrado"
      );
    });
  });
});
