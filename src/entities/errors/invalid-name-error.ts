export class InvalidNameError extends Error {
  constructor() {
    super("O nome inserido é inválido!");
    this.name = "InvalidNameError";
  }
}