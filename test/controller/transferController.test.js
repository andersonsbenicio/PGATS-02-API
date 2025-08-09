// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

//Mock
const transfService = require("../../services/transferService");

//Testes
describe("TransferController", () => {
  describe("POST /transfers", () => {
    it("Quando informo remetente e destinatário inexistentes recebo 400", async () => {
      const resposta = await request(app).post("/transfers").send({
        from: "eustaquio",
        to: "crispiniana",
        value: 100,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Dados de transferência inválidos"
      );
    });

    it("Usando Mocks: Quando informo remetente e destinatário inexistentes recebo 400", async () => {
      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transfService, "transfer");
      transferServiceMock.throws(new Error("Dados de transferência inválidos"));

      const resposta = await request(app).post("/transfers").send({
        from: "eustaquio",
        to: "crispiniana",
        value: 100,
      });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Dados de transferência inválidos"
      );

      //Reseto o Mock
      sinon.restore();
    });
  });
  describe("GET /transfers", () => {
    // Its ficam aqui
  });
});
