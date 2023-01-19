import { Cliente } from "@/entities/cliente";

describe("Entidade cliente", () => {
  test("Espero não criar cliente e retornar erro caso nome seja inválido", () => {
    const input = {
      name: "invalid_name",
      email: "validemail@mail.com"
    }
    const error = Cliente.create(input).value as Error;
    expect(error.name).toBe("InvalidNameError");
  })

  test("Espero não criar cliente e retornar erro caso e-mail seja inválido", () => {
    const input = {
      name: "Valid Name",
      email: "invalidemail mail.com"
    }
    const error = Cliente.create(input).value as Error;
    expect(error.name).toBe("InvalidEmailError");
  })

  test("Espero retornar cliente com dados válidos", () => {
    const input = {
      name: "Valid Name",
      email: "validemail@mail.com"
    }
    const cliente = Cliente.create(input).value as Cliente;
    expect(cliente.name.value).toBe("Valid Name");
    expect(cliente.email.value).toBe("validemail@mail.com");
  })

  test("Espero retornar JSON com dados do cliente ao usar método toJson", () => {
    const input = {
      name: "Valid Name",
      email: "validemail@mail.com"
    }
    const cliente = Cliente.create(input).value as Cliente;
    const json = cliente.toJson();
    expect(json.name).toBe("Valid Name");
    expect(json.email).toBe("validemail@mail.com");
  })
})