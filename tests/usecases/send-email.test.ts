import { MailerContract } from "@/adapters/contracts/mailer";
import { QueueContract } from "@/adapters/contracts/queue";
import { NodemailerAdapterImpl } from "@/adapters/nodemailer-adapter-impl";
import { RabbitAdapterImpl } from "@/adapters/rabbit-adapter-impl";
import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { SendEmail } from "@/usecases/send-email";
import { InMemoryMalaDiretaRepository } from "../data/memory-mala-direta-repository";

describe("SendEmail Usecase", () => {

  const queue: QueueContract = new RabbitAdapterImpl(); 
  const nomeFila = "fila-teste";
  
  test("espero enviar dados para a fila", async () => {
    const lista = [];
    const repository: MalaDiretaRepository = new InMemoryMalaDiretaRepository(lista);
    const mailer: MailerContract = new NodemailerAdapterImpl();
    const usecase = new SendEmail(repository, mailer);
    let mensagens = await queue.get(nomeFila, 20);
    await usecase.execute(mensagens);
  })
})