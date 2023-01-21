import { RabbitAdapterImpl } from "@/adapters/rabbit-adapter-impl";
import { GetEmailsFromQueue } from "@/usecases/get-emails-from-queue";
import { GetEmailsModel } from "@/usecases/models/get-emails-model";

describe("GetEmailsFromQueue Usecase", () => {
  test("espero resgatar todas as mensagens", async () => {
    const queue = new RabbitAdapterImpl();
    const usecase = new GetEmailsFromQueue(queue);
    const response = (await usecase.execute()).value as GetEmailsModel;
    expect(response.body).toBeInstanceOf(Array);
    expect(response.count).not.toBeNull();
    expect(response).toMatchObject({} as GetEmailsModel)
  })
})