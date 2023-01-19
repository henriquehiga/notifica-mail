import { Email } from "@/entities/email";

describe("Entidade Email", () => {
  test("Espero retornar erro caso e-mail seja inválido", () => {
    const input = "invalidemail mail.com";
    const error = Email.create(input).value as Error;
    expect(error.message).toBe("O e-mail inserido é inválido!");
    expect(error.name).toBe("InvalidEmailError");
  })

  test("Espero retornar Email ao passar email válido", () => {
    const input = "anyvalidemail@mail.com";
    const email = Email.create(input).value as Email;
    expect(email.value).toBe("anyvalidemail@mail.com");
  })
})