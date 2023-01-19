import { Name } from "@/entities/name";

describe("Entidade nome", () => {
  test("Espero retornar erro caso o nome seja inválido", () => {
    const input = "invalid_name";
    const error = Name.create(input).value as Error;
    expect(error.message).toBe("O nome inserido é inválido!");
    expect(error.name).toBe("InvalidNameError");
  })

  test("Espero retornar Name enviando dados válidos", () => {
    const input = "Valid Name";
    const nome = Name.create(input).value as Name;
    expect(nome.value).toBe("Valid Name");
  })
})