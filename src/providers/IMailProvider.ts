export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IMailProvider {
  // Retorna um link de pré-visualização (quando o provider suporta) ou null
  sendMail(message: MailMessage): Promise<string | null>;
}
