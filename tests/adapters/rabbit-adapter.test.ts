import { QueueContract } from "@/adapters/contracts/queue";
import { RabbitAdapterImpl } from "@/adapters/rabbit-adapter-impl";
import { QUEUE_CONSTANTS } from "@/adapters/utils/constants";

describe('RabbitMQ Adapter', () => {
  const queue: QueueContract = new RabbitAdapterImpl(); 
  const nomeFila = QUEUE_CONSTANTS.FILA;
  const nomeExchange = QUEUE_CONSTANTS.EXCHANGE;
  const nomeRoutingKey = QUEUE_CONSTANTS.ROUTING_KEY;

  afterEach(async () => {
    await queue.deleteQueue(nomeFila);
  });

  it('espero inserir mensagens na fila', async () => {
    for(let i = 0; i < 20; i++) {
      await queue.send(nomeExchange, nomeRoutingKey, {
        name: "valid name " + i,
        email: "validemail@mail.com"
      });
    }
    const quantidadeMensagensFila = await queue.count(nomeFila);
    expect(quantidadeMensagensFila).toBe(20);
  });
});
