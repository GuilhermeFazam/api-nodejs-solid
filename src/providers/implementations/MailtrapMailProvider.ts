import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailProvider, IMessage } from '../IMailProviders';

export default class MailtrapMailProvider implements IMailProvider {
  private transporter:Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  async sendMail(message:IMessage):Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.address,
      },
      from: {
        name: message.from.name,
        address: message.from.address,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
