import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  vus: 2,
  //duration: "30s",
  iterations: 10,
  thresholds: {
    http_req_duration: ["p(90)<=3", "p(95)<=5"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  let responseLogin = "";

  group("Fazendo login", () => {
    responseLogin = http.post(
      "http://localhost:3000/users/login",
      JSON.stringify({
        username: "eustaquio",
        password: "123456",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
  });

  group("Fazendo uma Transferência", () => {
    let responseTransfer = http.post(
      "http://localhost:3000/transfers",
      JSON.stringify({
        from: "eustaquio",
        to: "crispiniana",
        amount: 10,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${responseLogin.json("token")}`,
        },
  });

    check(responseTransfer, {
    "status deve ser igual a 201": (r) => r.status === 201,
    });
  });

  group("Simulando pensamento do usuário", () => {
    sleep(1); // User Think Time
  });
}