import { QueueContract } from "@/adapters/contracts/queue";
import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";
import { SendToQueue } from "@/usecases/send-to-queue";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { badRequest, created } from "../utils/response";

export class SendDataQueueController implements Controller {
  constructor(private readonly queue: QueueContract) {
  }

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const data = req.body as CreateMalaDiretaModel[];
    const usecase = new SendToQueue(this.queue);
    const response = await usecase.execute(data);
    if(response.isLeft()) {
      return badRequest(response.value.message);
    }
    return created();
  };
}