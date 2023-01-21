import { QueueContract } from "@/adapters/contracts/queue";
import { RabbitAdapterImpl } from "@/adapters/rabbit-adapter-impl";
import { QUEUE_CONSTANTS } from "@/adapters/utils/constants";
import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";
import { SendToQueue } from "@/usecases/send-to-queue";

describe("SendToQueue Usecase", () => {
  const queue: QueueContract = new RabbitAdapterImpl(); 
  const nomeFila = QUEUE_CONSTANTS.FILA_TESTES;
  const exchange = QUEUE_CONSTANTS.EXCHANGE;
  const routingKey = QUEUE_CONSTANTS.ROUTING_KEY;
  
  // afterEach(async () => {
  //   await queue.deleteQueue(nomeFila);
  // });

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
    await usecase.execute(input, exchange, routingKey);
    let data = await queue.get(exchange, nomeFila, routingKey);
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
    const error = (await usecase.execute(input, exchange, routingKey)).value as Error;
    expect(error.name).toBe("InvalidNameError");
  })
})