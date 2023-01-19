import { QueueContract } from "@/adapters/contracts/queue";
import { RabbitFilaImpl } from "@/adapters/rabbit-queue-impl";
import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";
import { SendToQueue } from "@/usecases/send-to-queue";

describe("SendToQueue Usecase", () => {
  const queue: QueueContract = new RabbitFilaImpl(); 
  const nomeFila = "fila-teste";

  afterEach(async () => {
    await queue.deleteQueue(nomeFila);
  });

  test("espero enviar dados para a fila", async () => {
    const usecase = new SendToQueue(queue);
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
    await usecase.execute(input, nomeFila);
    let data = await queue.get(nomeFila, 1);
    data = JSON.parse(data[0]);
    expect(data).toEqual(maladiretaData);
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
    const error = (await usecase.execute(input, nomeFila)).value as Error;
    expect(error.name).toBe("InvalidNameError");
  })
})