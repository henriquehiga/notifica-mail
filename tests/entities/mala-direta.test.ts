import { MalaDireta } from "@/entities/mala-direta";

describe("Entidade mala direta", () => {
  test("Retorna erro caso nome seja inválido", () => {
    const inputClienteData = {
      name: "invalid_name",
      email: "validemail@mail.com"
    }
    const inputTemplateData = {
      templateCode : "abc-123"
    }
    const error = MalaDireta.create(inputClienteData, inputTemplateData).value as Error;
    expect(error.name).toBe("InvalidNameError");
  })

  test("Retorna erro caso email seja inválido", () => {
    const inputClienteData = {
      name: "Valid Name",
      email: "invalid email@mail.com"
    }
    const inputTemplateData = {
      templateCode : "abc-123"
    }
    const error = MalaDireta.create(inputClienteData, inputTemplateData).value as Error;
    expect(error.name).toBe("InvalidEmailError");
  })

  test("Retorna erro caso não envie template id", () => {
    const inputClienteData = {
      name: "Valid Name",
      email: "validemail@mail.com"
    }
    const inputTemplateData = {
      templateCode : ""
    }
    const error = MalaDireta.create(inputClienteData, inputTemplateData).value as Error;
    expect(error.name).toBe("InvalidTemplateCode");
  })
})