import { NodemailerAdapterImpl } from "@/adapters/nodemailer-adapter-impl";
import { RabbitAdapterImpl } from "@/adapters/rabbit-adapter-impl";
import { SendDataQueueController } from "@/presentation/controllers/send-data-queue";
import { GetEmailsFromQueue } from "@/usecases/get-emails-from-queue";
import { SendEmail } from "@/usecases/send-email";
import { SendToQueue } from "@/usecases/send-to-queue";
import { InMemoryMalaDiretaRepository } from "./data/memory-mala-direta-repository";
import { InMemoryMalaDiretaTemplateRepository } from './data/memory-mala-direta-template-repository';

describe("E2E", () => {
  test("Teste e2e", async () => {
    const queue = new RabbitAdapterImpl();
    const listMaladireta = [];
    const listTemplate = [];
    const maladiretaRepository = new InMemoryMalaDiretaRepository(listMaladireta);
    const templateRepository = new InMemoryMalaDiretaTemplateRepository(listTemplate);
    const mailer = new NodemailerAdapterImpl();
    await templateRepository.save({
      code: "abc-123",
      html: `<b>Template HTML E2E</b>`,
      text: `Texto E2E`
    })
    const inputController = {
      body: [
        {
          cliente: {
            name: "Henrique Higa",
            email: "henriquehiga@hotmail.com"
          },
          maladiretaData: {
            templateCode: "abc-123"
          }
        }
      ]
    }
    const usecaseSendDataToQueue = new SendToQueue(queue);
    const controller = new SendDataQueueController(usecaseSendDataToQueue);
    const responsePresentation = await controller.handle(inputController)
    const usecaseGetEmails = new GetEmailsFromQueue(queue);
    const usecaseSendEmail = new SendEmail(usecaseGetEmails, maladiretaRepository, templateRepository, mailer);
    const response = await usecaseSendEmail.execute();
    expect(responsePresentation.statusCode).toBe(201);
    expect(response.isRight()).toBeTruthy();
  })
})