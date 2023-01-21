export class PersistDatabaseError extends Error {
  constructor() {
    super("Erro ao gravar na base de dados");
    this.name = "PersistDatabaseError";
  }
}