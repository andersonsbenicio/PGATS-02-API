// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

//Testes
describe("TransferController", () => {
  describe("POST /transfers", () => {
    it("Quando informo remetente e destinatário inexistentes recebo 400", async () => {
      const resposta = await request(app).post("/transfers").send({
        from: "julio",
        to: "priscila",
        value: 100,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Dados de transferência inválidos"
      );
    });
  });
  describe("GET /transfers", () => {
    // Ist ficam aqui
  });
});
