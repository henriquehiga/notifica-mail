import { MailSendData } from "../models/mail-send-data";

export type MailerContract = {
  send: (data: MailSendData) => Promise<void>;
}