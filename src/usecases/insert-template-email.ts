import { MalaDiretaTemplateRepository } from "@/data/contracts/mala-direta-template-repository";
import { HtmlTemplateModel } from "@/entities/models/html-template";
import { Either, left, right } from "@/shared/either";
import { TemplateAlreadyExistsError } from "./errors/template-already-exists-error";

export class InsertTemplateEmail {

  constructor(private readonly repository: MalaDiretaTemplateRepository){ }
  
  async execute(email: HtmlTemplateModel): Promise<Either<Error, true>> {
    const templateExists = await this.repository.getByCode(email.code);
    if(!templateExists) {
      return left(new TemplateAlreadyExistsError());
    }
    try {
      await this.repository.save(email);
      return right(true);
    } catch(err) {
      return left(new Error(err));
    }
  }
}