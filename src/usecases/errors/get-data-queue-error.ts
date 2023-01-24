export class GetDataQueueError extends Error {
  constructor() {
    super("Erro ao resgatar dados da fila;");
    this.name = "GetDataQueueError";
  }
}