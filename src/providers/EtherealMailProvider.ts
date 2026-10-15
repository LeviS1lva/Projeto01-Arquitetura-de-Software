import nodemailer from 'nodemailer';
import { IMailProvider, MailMessage } from './IMailProvider';
import { getMailClient } from '../lib/mail';

export class EtherealMailProvider implements IMailProvider {
  async sendMail(message: MailMessage): Promise<string | null> {
    const mailer = await getMailClient();

    const info = await mailer.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    return previewUrl || null;
  }
}
