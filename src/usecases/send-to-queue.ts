import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { InvalidNameError } from "@/entities/errors/invalid-name-error";
import { InvalidTemplateCode } from "@/entities/errors/invalid-template-code";
import { MalaDireta } from "@/entities/mala-direta";
import { CreateMalaDiretaModel } from '@/entities/models/create-mala-direta';
import { QueueContract } from "@/services/contracts/queue";
import { Either, left } from "@/shared/either";

export class SendToQueue {
  constructor(private repository: MalaDiretaRepository, private fila: QueueContract) { }

  async execute(data: CreateMalaDiretaModel[]) : Promise<Either<InvalidEmailError | InvalidNameError | InvalidTemplateCode, void>> {
    for(let maladiretaData of data) {
      const maladiretaOrError = MalaDireta.create(maladiretaData);
      if(maladiretaOrError.isLeft()) {
        return left(maladiretaOrError.value);
      }
      await this.fila.send("email", maladiretaOrError.value);
      await this.repository.save(maladiretaOrError.value);
    }
    return;
  }
}