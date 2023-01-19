export class InvalidTemplateCode extends Error {
  constructor() {
    super("Código de template inválido!");
    this.name = "InvalidTemplateCode";
  }
}