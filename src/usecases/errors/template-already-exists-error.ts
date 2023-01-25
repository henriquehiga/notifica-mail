export class TemplateAlreadyExistsError extends Error {
  constructor() {
    super("Um template com esse ID já existe!");
    this.name = "TemplateAlreadyExistsError";
  }
}