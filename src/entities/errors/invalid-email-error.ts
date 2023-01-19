export class InvalidEmailError extends Error {
  constructor() {
    super("O e-mail inserido é inválido!");
    this.name = "InvalidEmailError";
  }
}