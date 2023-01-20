import { HtmlTemplateModel } from "@/entities/models/html-template";

export interface MalaDiretaTemplateRepository {
  save: (data: HtmlTemplateModel) => Promise<void>;
  getByCode: (code: string) => Promise<HtmlTemplateModel>;
}