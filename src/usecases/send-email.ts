import { MailerContract } from "@/adapters/contracts/mailer";
import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { MalaDiretaTemplateRepository } from "@/data/contracts/mala-direta-template-repository";
import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { InvalidNameError } from "@/entities/errors/invalid-name-error";
import { InvalidTemplateCode } from "@/entities/errors/invalid-template-code";
import { MalaDireta } from "@/entities/mala-direta";
import { CreateMalaDiretaModel } from '@/entities/models/create-mala-direta';
import { Either, left } from "@/shared/either";

export class SendEmail {
  constructor(
    private maladiretaRepository: MalaDiretaRepository, 
    private templateRepository: MalaDiretaTemplateRepository,
    private mailer: MailerContract
  ) { }

  async execute(data: CreateMalaDiretaModel[]) : Promise<Either<InvalidEmailError | InvalidNameError | InvalidTemplateCode, void>> {
    for(let dataMala of data) {
      dataMala = JSON.parse(dataMala.toString());
      const maladiretaOrError = MalaDireta.create(dataMala);
      if(maladiretaOrError.isLeft()) {
        return left(maladiretaOrError.value);
      }
      let { html, text } = await this.templateRepository.getByCode(dataMala.maladiretaData.templateCode);
      html = html.replace("##NOME##", dataMala.cliente.name);
      await this.mailer.send({
        to: dataMala.cliente.email,
        subject: dataMala.maladiretaData.templateCode,
        html,
        text
      });
      await this.maladiretaRepository.save(maladiretaOrError.value);
    }
  }
}