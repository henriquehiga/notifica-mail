import config from "@/config/mailer-config";
import nodemailer from "nodemailer";
import { MailerContract } from "./contracts/mailer";
import { MailSendData } from "./models/mail-send-data";

export class NodemailerAdapterImpl implements MailerContract {
  constructor() { }

  async getTransporter() {
    try {
      let transporter = nodemailer.createTransport(config);
      return transporter;
    } catch(err) {
      throw new Error();
    }
  }

  async send({ html, subject, text, to } : MailSendData) {
    try {
      const transporter = await this.getTransporter();
      await transporter.sendMail({
        from : process.env.MAIL_EMAIL,
        to,
        subject,
        text,
        html,
      });
    } catch(err) {
      throw new Error();
    }
  };
}