export class MailerError extends Error {
  constructor() {
    super("Ocorreu um erro ao enviar o e-mail!");
    this.name = "MailerError";
  }
}