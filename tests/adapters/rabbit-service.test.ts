import { QueueContract } from "@/adapters/contracts/queue";
import { RabbitFilaImpl } from "@/adapters/rabbit-queue-impl";

describe('RabbitMQ Adapter', () => {

  const queue: QueueContract = new RabbitFilaImpl(); 
  const nomeFila = "teste/rabbit-adapter";

  afterEach(async () => {
    await queue.deleteQueue(nomeFila);
  });

  it('espero inserir mensagens na fila', async () => {
    for(let i = 0; i < 20; i++) {
      await queue.send(nomeFila, {
        name: "valid name " + i,
        email: "validemail@mail.com"
      });
    }
    const quantidadeMensagensFila = await queue.count(nomeFila);
    expect(quantidadeMensagensFila).toBe(20);
  });

  it('espero resgatar a quantidade de mensagens que foi estipulada', async () => {
    await queue.send(nomeFila, {
      name: "valid name 1",
      email: "validemail1@mail.com"
    });
    await queue.send(nomeFila, {
      name: "valid name 2",
      email: "validemail2@mail.com"
    });
    const mensagens = await queue.get(nomeFila, 2);
    expect(mensagens.length).toBe(2);
  });
});
