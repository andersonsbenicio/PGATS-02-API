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
        amount: 100,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Usuário remetente ou destinatário não encontrado"
      );
    });

    it("Usando Mocks: Quando informo remetente e destinatário inexistentes recebo 400", async () => {
      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transfService, "transfer");
      transferServiceMock.throws(new Error("Dados de transferência inválidos"));

      const resposta = await request(app).post("/transfers").send({
        from: "eustaquio",
        to: "crispiniana",
        amount: 100,
      });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Dados de transferência inválidos"
      );
      //Reseto o Mock
      sinon.restore();
    });

    it("Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED", async () => {
      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transfService, "transfer");
      transferServiceMock.returns({
        from: "eustaquio",
        to: "crispiniana",
        amount: 100,
        date: new Date().toDateString(),
      });

      const resposta = await request(app).post("/transfers").send({
        from: "eustaquio",
        to: "crispiniana",
        amount: 100,
      });

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("transfer");
      expect(resposta.body.transfer).to.have.property("from", "eustaquio");
      expect(resposta.body.transfer).to.have.property("to", "crispiniana");
      expect(resposta.body.transfer).to.have.property("amount", 100);

      //Reseto o Mock
      sinon.restore();
    });
  });
  describe("GET /transfers", () => {
    // Its ficam aqui
  });
});
