import { RabbitFilaImpl } from "@/interfaces/rabbit-queue-impl";

describe('RabbitMQ', () => {
  it('espero inserir e resgatar a quantidade de mensagens que eu estipular', async () => {
    const fila = new RabbitFilaImpl();
    const nomeFila = 'email';
    for(let i = 0; i < 20; i++) {
      await fila.send(nomeFila, {
        name: "name " + i,
        email: "validemail@mail.com"
      });
    }
    const mensagens = await fila.get(nomeFila, 20);
    expect(mensagens.length).toBe(20);
  });
});
