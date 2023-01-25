import { HtmlTemplateModel } from "@/entities/models/html-template";
import { InsertTemplateEmail } from "@/usecases/insert-template-email";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { badRequest, created } from "../utils/response";

export class CreateTemplate implements Controller {

  constructor(private readonly insertTemplateEmailUseCase: InsertTemplateEmail) { }
  
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const data = request.body as HtmlTemplateModel;
    const trueOrError = await this.insertTemplateEmailUseCase.execute(data);
    if(trueOrError.isLeft()) {
      return badRequest(trueOrError.value.message);
    }
    return created();
  };
}