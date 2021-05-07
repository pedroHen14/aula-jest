//subit o servidor no supertest
//criar variavel de ambiente para rodar o teste no bd de teste

const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const { cpf } = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {
  afterAll(() => {
    connection.close();
  });

  beforeEach(async (done) => {
    await truncate(connection.models);
    done();
  });

  it("é possivel criar um novo gerente", async () => {
    const response = await request(app).post("/managers").send({
      name: "Pedro Henrique",
      cpf: cpf.generate(),
      email: "teste@gmail.com",
      cellphone: "5511976057989",
      password: "123456",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  });

  it("nãp é possivel cadastrar um gerente com cpf já existente", async () => {
    let cpfGerente = cpf.generate();

    let response = await request(app).post("/managers").send({
      name: "Pedro Henrique",
      cpf: cpfGerente,
      email: "teste@gmail.com",
      cellphone: "5511976057989",
      password: "123456",
    });

    response = await request(app).post("/managers").send({
      name: "Gabriella Fogaça",
      cpf: cpfGerente,
      email: "teste@gmail.com",
      cellphone: "5511988828662",
      password: "123456",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("cpf already exists");
  });
});
