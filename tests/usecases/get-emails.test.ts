import { NodemailerAdapterImpl } from "@/adapters/nodemailer-adapter-impl";
import { RabbitAdapterImpl } from "@/adapters/rabbit-adapter-impl";
import { GetEmailsFromQueue } from "@/usecases/get-emails-from-queue";
import { InMemoryMalaDiretaRepository } from "../data/memory-mala-direta-repository";

describe("GetEmailsFromQueue Usecase", () => {
  test("espero resgatar todas as mensagens", async () => {
    const queueName = "fila-teste";
    const queue = new RabbitAdapterImpl();
    const lista = [];
    const repository = new InMemoryMalaDiretaRepository(lista);
    const mailer = new NodemailerAdapterImpl();
    const usecase = new GetEmailsFromQueue(queueName, queue, repository, mailer);
    await usecase.execute();
  })
})