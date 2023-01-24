import { QueueContract } from "@/adapters/contracts/queue";
import { RabbitAdapterImpl } from "@/adapters/rabbit-adapter-impl";
import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";
import { GetEmailsFromQueue } from "@/usecases/get-emails-from-queue";
import { SendToQueue } from "@/usecases/send-to-queue";

describe("SendToQueue Usecase", () => {
  const queue: QueueContract = new RabbitAdapterImpl(); 

  test("espero enviar dados para a fila", async () => {
    const usecaseSendData = new SendToQueue(queue);
    const usecaseGetData = new GetEmailsFromQueue(queue);
    const maladiretaData : CreateMalaDiretaModel = {
      cliente: {
        email: "validemail@mail.com",
        name: "valid name"
      },
      maladiretaData: {
        templateCode: "abc-123"
      }
    }
    const input = [ maladiretaData ];
    await usecaseSendData.execute(input);
    let data = (await usecaseGetData.execute());
    expect(data.isRight).toBeTruthy();
  })

  test("espero não enviar dados para a fila caso nome esteja incorreto", async () => {
    const usecase = new SendToQueue(queue);
    const maladiretaData : CreateMalaDiretaModel = {
      cliente: {
        email: "validemail@mail.com",
        name: "invalid_name"
      },
      maladiretaData: {
        templateCode: "abc-123"
      }
    }
    const input = [ maladiretaData ];
    const error = (await usecase.execute(input)).value as Error;
    expect(error.name).toBe("InvalidNameError");
  })
})