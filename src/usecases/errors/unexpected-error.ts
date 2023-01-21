export class UnexpectedError extends Error {
  constructor() {
    super("Ocorreu um erro inesperado!");
    this.name = "UnexpectedError";
  }
}