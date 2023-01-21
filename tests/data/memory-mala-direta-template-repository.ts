import { MalaDiretaTemplateRepository } from "@/data/contracts/mala-direta-template-repository";
import { HtmlTemplateModel } from "@/entities/models/html-template";

export class InMemoryMalaDiretaTemplateRepository implements MalaDiretaTemplateRepository {
  constructor(private readonly repository: HtmlTemplateModel[]) { }

  async save(data: HtmlTemplateModel): Promise<void> {
    this.repository.push(data);
  };

  async getByCode(code: string): Promise<HtmlTemplateModel> {
    return this.repository.find(template => template.code == code);
  };
}