import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";
import { QueueContract } from "@/services/contracts/queue";
import { RabbitFilaImpl } from "@/services/rabbit-queue-impl";
import { SendToQueue } from "@/usecases/send-to-queue";
import { InMemoryMalaDiretaRepository } from "../data/memory-mala-direta-repository";

describe("SendToQueue Usecase", () => {
  test("Executar caso de uso corretamente", async () => {
    const malasdiretas = [];
    const repository: MalaDiretaRepository = new InMemoryMalaDiretaRepository(malasdiretas);
    const queue: QueueContract = new RabbitFilaImpl(); 
    const usecase = new SendToQueue(repository, queue);
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
    await usecase.execute(input);
  })
})