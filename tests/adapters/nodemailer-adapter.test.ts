import { NodemailerAdapterImpl } from "@/adapters/nodemailer-adapter-impl";

describe('Nodemailer Adapter', () => {
  test("espero que envie um email", async () => {
    const mailer = new NodemailerAdapterImpl();
    await mailer.send("Teste");
  })
});
