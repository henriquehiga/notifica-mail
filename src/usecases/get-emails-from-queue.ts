import { QueueContract } from "@/adapters/contracts/queue";
import { QUEUE_CONSTANTS } from "@/adapters/utils/constants";
import { Either, left, right } from "@/shared/either";
import { GetDataQueueError } from "./errors/get-data-queue-error";
import { GetEmailsModel } from "./models/get-emails-model";

export class GetEmailsFromQueue {
  private queueName: string = QUEUE_CONSTANTS.FILA;
  private exchange: string = QUEUE_CONSTANTS.EXCHANGE;
  private routingKey: string = QUEUE_CONSTANTS.ROUTING_KEY;

  constructor(
    private queue: QueueContract,
  ) { }

  async execute(): Promise<Either<GetDataQueueError, GetEmailsModel>> {
    try {
      let quantidadeTotalDadosFila = await this.queue.count(this.queueName);
      let dadosFila = await this.queue.get(this.exchange, this.queueName, this.routingKey);
      let data = {
        count: quantidadeTotalDadosFila,
        body: dadosFila
      }
      return right(data);
    } catch(err) {
      return left(new GetDataQueueError());
    }
  }
}