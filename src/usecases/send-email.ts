import { MailerContract } from "@/adapters/contracts/mailer";
import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { MalaDiretaTemplateRepository } from "@/data/contracts/mala-direta-template-repository";
import { MalaDireta } from "@/entities/mala-direta";
import { Either, left, right } from "@/shared/either";
import { MailerError } from "./errors/mailer-error";
import { PersistDatabaseError } from "./errors/persist-database-error";
import { PersistQueueError } from "./errors/persist-queue-error";
import { GetEmailsFromQueue } from "./get-emails-from-queue";
import { GetEmailsModel } from "./models/get-emails-model";

export class SendEmail {
  constructor(
    private getEmails: GetEmailsFromQueue,
    private maladiretaRepository: MalaDiretaRepository, 
    private templateRepository: MalaDiretaTemplateRepository,
    private mailer: MailerContract
  ) { }

  private async resgataDadosFila(): Promise<Either<PersistQueueError, GetEmailsModel>> {
    const response = await this.getEmails.execute();
    if(response.isLeft()) {
      return left(response.value);
    }
    return right(response.value);
  }

  async execute() : Promise<Either<Error, true>> {
    var queueDataOrError = await this.resgataDadosFila();
    if(queueDataOrError.isLeft()) {
      return left(queueDataOrError.value);
    }
    let queueData = queueDataOrError.value;
    var quantityQueueData = queueData.count;
    while(quantityQueueData > 0) {
      let data = queueData.body; 
      for(let dataMala of data) {
        dataMala = JSON.parse(dataMala.toString());
        const maladiretaOrError = MalaDireta.create(dataMala);
        if(maladiretaOrError.isLeft()) {
          return left(maladiretaOrError.value);
        }
        let { html, text } = await this.templateRepository.getByCode(dataMala.maladiretaData.templateCode);
        html = html.replace("%%NOME%%", dataMala.cliente.name);
        try {
          await this.mailer.send({
            to: dataMala.cliente.email,
            subject: dataMala.maladiretaData.templateCode,
            html,
            text
          });
        } catch (err) {
          return left(new MailerError());
        }
        try {
          await this.maladiretaRepository.save(maladiretaOrError.value);
        } catch (err) {
          return left(new PersistDatabaseError());
        }
      }
      queueDataOrError = await this.resgataDadosFila();
      if(queueDataOrError.isLeft()) {
        return left(queueDataOrError.value);
      }
      queueData = queueDataOrError.value;
      quantityQueueData = queueData.count;
    }
    return right(true);
  }
}