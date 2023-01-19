import { MalaDireta } from "@/entities/mala-direta";
import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";

describe("Entidade mala direta", () => {
  test("Retorna erro caso nome seja inválido", () => {
    const input: CreateMalaDiretaModel = {
      cliente : {
        name: "invalid_name",
        email: "validemail@mail.com"
      },
      maladiretaData : {
        templateCode : "abc-123"
      }
    }
    const error = MalaDireta.create(input).value as Error;
    expect(error.name).toBe("InvalidNameError");
  })

  test("Retorna erro caso email seja inválido", () => {
    const input: CreateMalaDiretaModel = {
      cliente : {
        name: "valid name",
        email: "invlaidemailmail.com"
      },
      maladiretaData : {
        templateCode : "abc-123"
      }
    }
    const error = MalaDireta.create(input).value as Error;
    expect(error.name).toBe("InvalidEmailError");
  })

  test("Retorna erro caso não envie template id", () => {
    const input: CreateMalaDiretaModel = {
      cliente : {
        name: "valid name",
        email: "validemail@mail.com"
      },
      maladiretaData : {
        templateCode : ""
      }
    }
    const error = MalaDireta.create(input).value as Error;
    expect(error.name).toBe("InvalidTemplateCode");
  })
})