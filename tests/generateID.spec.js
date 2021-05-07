const generatedId = require("../src/utils/generateUUID");

//se é possivel gerar um uuid unico
//se esta vindo um id
//se esse id é uma string
//se o tamanho da string é o que eu espero, 36 caracteres

describe("generateUUID", () => {
  it("se é possivel gerar um uuid unico", () => {
    const id = generatedId();

    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(id).toHaveLength(36);
  });
});
