// Bibliotecas
const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();

//Testes
describe("Transfer", () => {
  describe("POST /transfers", () => {
    beforeEach(async () => {
      const respostaLogin = await request(process.env.BASE_URL_REST)
        .post("/users/login")
        .send({
          username: "eustaquio",
          password: "123456",
        });

      token = respostaLogin.body.token;
    });
    it("Quando informo destinatario inexistentes recebo 400", async () => {
      const resposta = await request(process.env.BASE_URL_REST)
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

    it("Quando informo remetente e destinatario inexistentes recebo 400", async () => {
      const resposta = await request(process.env.BASE_URL_REST)
        .post("/transfers")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "dioclessiano",
          to: "firmina",
          amount: 100,
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Usuário remetente ou destinatário não encontrado"
      );
    });

    it("Quando informo valores válidos eu tenho sucesso com 201 CREATED", async () => {
      const resposta = await request(process.env.BASE_URL_REST)
        .post("/transfers")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "eustaquio",
          to: "crispiniana",
          amount: 100,
        });

      expect(resposta.status).to.equal(201);

      // Validação com um Fixture
      const respostaEsperada = require("../fixture/respostas/quandoInformoValoresValidosEuTenhoSucesso.json");
      delete resposta.body.transfer.date; // Ignorar a data na comparação
      delete respostaEsperada.transfer.date; // Ignorar a data na comparação
      expect(resposta.body).to.deep.equal(respostaEsperada);
    });
  });
});
