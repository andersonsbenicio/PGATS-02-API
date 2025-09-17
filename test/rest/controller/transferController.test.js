// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../../app");

//Mock
const transfService = require("../../../services/transferService");

//Testes
describe("TransferController", () => {
  describe("POST /transfers", () => {
    beforeEach(async () => {
      const respostaLogin = await request(app).post("/users/login").send({
        username: "eustaquio",
        password: "123456",
      });

      token = respostaLogin.body.token;
    });
    it("Quando informo remetente e destinatário inexistentes recebo 400", async () => {
      const resposta = await request(app)
        .post("/transfers")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "eustaquio",
          to: "firmina",
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

      const resposta = await request(app)
        .post("/transfers")
        .set("Authorization", `Bearer ${token}`)
        .send({
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
        amount: 10,
        date: new Date().toDateString(),
      });

      const resposta = await request(app)
        .post("/transfers")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "eustaquio",
          to: "crispiniana",
          amount: 10,
        });

      expect(resposta.status).to.equal(201);

      // Validação com um Fixture
      const respostaEsperada = require("../fixture/respostas/quandoInformoValoresValidosEuTenhoSucesso.json");
      delete resposta.body.transfer.date; // Ignorar a data na comparação
      delete respostaEsperada.transfer.date; // Ignorar a data na comparação
      expect(resposta.body).to.deep.equal(respostaEsperada);

      // Um expect para comparar a Resposta.body com a String contida no arquivo
      // expect(resposta.body).to.have.property("transfer");
      // expect(resposta.body.transfer).to.have.property("from", "eustaquio");
      // expect(resposta.body.transfer).to.have.property("to", "crispiniana");
      // expect(resposta.body.transfer).to.have.property("amount", 100);

      //Reseto o Mock
      sinon.restore();
    });
  });
  describe("GET /transfers", () => {
    // Its ficam aqui
  });
});
