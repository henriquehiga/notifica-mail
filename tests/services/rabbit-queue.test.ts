import { RabbitFilaImpl } from "@/services/rabbit-queue-impl";

describe('RabbitMQ', () => {
  it('espero inserir mensagens na fila', async () => {
    const fila = new RabbitFilaImpl();
    const nomeFila = 'teste-fila';
    for(let i = 0; i < 20; i++) {
      await fila.send(nomeFila, {
        name: "name " + i,
        email: "validemail@mail.com"
      });
    }
    const quantidadeMensagensFila = await fila.count(nomeFila);
    expect(quantidadeMensagensFila).toBe(20);
  });

  it('espero resgatar a quantidade de mensagens que foi estipulada', async () => {
    const fila = new RabbitFilaImpl();
    const nomeFila = 'teste-fila';
    const mensagens = await fila.get(nomeFila, 2);
    expect(mensagens.length).toBe(2);
  });
});
