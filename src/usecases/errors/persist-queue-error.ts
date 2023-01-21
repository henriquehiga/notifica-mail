export class PersistQueueError extends Error {
  constructor() {
    super("Erro ao inserir dados na fila");
    this.name = "PersistQueueError";
  }
}