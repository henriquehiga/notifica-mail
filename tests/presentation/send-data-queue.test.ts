import { QueueContract } from "@/adapters/contracts/queue";
import { SendDataQueueController } from "@/presentation/controllers/send-data-queue";

describe("SendDataQueueController", () => {

  class MockedQueue implements QueueContract {
    async get(exchange: string, queue: string, routingKey: string): Promise<any> {
      return [];
    }
    async send(exchange: string, routingKey: string, data: any): Promise<void> {
    }
    async count(queue: string): Promise<number> {
      return 0;
    }
    async deleteQueue(queue: string): Promise<void> {
    }
  }

  test("espero dar erro caso o nome enviado seja inválido", async () => {
    const controller = new SendDataQueueController(new MockedQueue());
    const input = {
      body: [
          {
          cliente: {
            name: "invalid_name",
            email: "valid@email.com"
          },
          maladiretaData: {
            templateCode: "abc-123"
          }
        }
      ]
    }
    const response = await controller.handle(input);
    expect(response).toEqual({
      body: "O nome inserido é inválido!",
      statusCode: 400
    })
  })

  test("espero dar erro caso o email enviado seja inválido", async () => {
    const controller = new SendDataQueueController(new MockedQueue());
    const input = {
      body: [
          {
          cliente: {
            name: "valid name",
            email: "invalid_email.com"
          },
          maladiretaData: {
            templateCode: "abc-123"
          }
        }
      ]
    }
    const response = await controller.handle(input);
    expect(response).toEqual({
      body: "O e-mail inserido é inválido!",
      statusCode: 400
    })
  })

  test("espero dar erro caso o templateCode enviado seja inválido", async () => {
    const controller = new SendDataQueueController(new MockedQueue());
    const input = {
      body: [
          {
          cliente: {
            name: "valid name",
            email: "valid@email.com"
          },
          maladiretaData: {
            templateCode: ""
          }
        }
      ]
    }
    const response = await controller.handle(input);
    expect(response).toEqual({
      body: "Código de template inválido!",
      statusCode: 400
    })
  })

  test("espero enviar dados para a fila com dados válidos", async () => {
    const controller = new SendDataQueueController(new MockedQueue());
    const input = {
      body: [
          {
          cliente: {
            name: "valid name",
            email: "valid@email.com"
          },
          maladiretaData: {
            templateCode: "abc-123"
          }
        }
      ]
    }
    const response = await controller.handle(input);
    expect(response).toEqual({
      body: null,
      statusCode: 201
    })
  })
})