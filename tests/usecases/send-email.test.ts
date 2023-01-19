import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";
import { QueueContract } from "@/services/contracts/queue";
import { RabbitFilaImpl } from "@/services/rabbit-queue-impl";
import { SendToQueue } from "@/usecases/send-to-queue";

describe("SendToQueue Usecase", () => {
  test.skip("Executar caso de uso corretamente", async () => {
    const queue: QueueContract = new RabbitFilaImpl(); 
    const usecase = new SendToQueue(queue);
    const maladiretaData : CreateMalaDiretaModel = {
      createClienteModel: {
        email: "validemail@mail.com",
        name: "valid name"
      },
      emailData: {
        templateCode: "abc-123"
      }
    }
    const input = [maladiretaData];
    await usecase.execute(input, "email");
  })

  test("", async () => {
    for (let index = 0; index < 100; index++) {
      const queue: QueueContract = new RabbitFilaImpl();
      const usecase = new SendToQueue(queue);
      const maladiretaData : CreateMalaDiretaModel = {
        createClienteModel: {
          email: "validemail@mail.com",
          name: "valid name"
        },
        emailData: {
          templateCode: "abc-123"
        }
      }
      const input = [maladiretaData, maladiretaData, maladiretaData, maladiretaData];
      await usecase.execute(input, 'email-teste')
    }
  })
})