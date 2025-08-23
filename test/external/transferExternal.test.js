// Bibliotecas
const request = require("supertest");
const { expect } = require("chai");

//Testes
describe("Transfer", () => {
  describe("POST /transfers", () => {
    it("Quando informo remetente e destinatario inexistentes recebo 400", async () => {
      // 1 - Realizar login e obter o token
      const respostaLogin = await request("http://localhost:3000")
        .post("/users/login")
        .send({
          username: "eustaquio",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      // 2 - Realizar a transferência
      const resposta = await request("http://localhost:3000")
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
  });
});
