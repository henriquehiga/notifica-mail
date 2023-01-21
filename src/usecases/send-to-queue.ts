import { QueueContract } from "@/adapters/contracts/queue";
import { QUEUE_CONSTANTS } from "@/adapters/utils/constants";
import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { InvalidNameError } from "@/entities/errors/invalid-name-error";
import { InvalidTemplateCode } from "@/entities/errors/invalid-template-code";
import { MalaDireta } from "@/entities/mala-direta";
import { CreateMalaDiretaModel } from '@/entities/models/create-mala-direta';
import { Either, left, right } from "@/shared/either";

export class SendToQueue {
  private exchange: string = QUEUE_CONSTANTS.EXCHANGE;
  private routingKey = QUEUE_CONSTANTS.ROUTING_KEY;

  constructor(private fila: QueueContract) { }

  async execute(data: CreateMalaDiretaModel[]) : Promise<Either<InvalidEmailError | InvalidNameError | InvalidTemplateCode, true>> {
    for(let maladiretaData of data) {
      const maladiretaOrError = MalaDireta.create(maladiretaData);
      if(maladiretaOrError.isLeft()) {
        return left(maladiretaOrError.value);
      }
      const maladireta = maladiretaOrError.value;
      const data: CreateMalaDiretaModel = {
        cliente : {
          email: maladireta.cliente.email.value,
          name: maladireta.cliente.name.value
        },
        maladiretaData: {
          templateCode: maladireta.maladiretaData.templateCode
        }
      }
      await this.fila.send(this.exchange, this.routingKey, data);
    }
    return right(true);
  }
}