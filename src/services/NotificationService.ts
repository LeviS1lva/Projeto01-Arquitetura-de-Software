import { IMailProvider } from '../providers/IMailProvider';
import { Product } from '../domain/IProduct';
import logger from '../lib/logger';

// Define O QUE enviar (assunto e corpo). COMO enviar é do provider.
export class NotificationService {
  constructor(private readonly mailProvider: IMailProvider) {}

  async sendOrderConfirmation(
    customer: string,
    orderId: number,
    total: number,
    products: Product[]
  ): Promise<string | null> {
    const previewUrl = await this.mailProvider.sendMail({
      to: customer,
      subject: `Confirmação do Pedido #${orderId}`,
      text: `Olá, seu pedido #${orderId} no valor de R$ ${total} foi confirmado.`,
      html: `
        <h1>Pedido Confirmado!</h1>
        <p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
        <p>Total: <strong>R$ ${total}</strong></p>
        <ul>
          ${products.map((p) => `<li>${p.name}</li>`).join('')}
        </ul>
      `,
    });

    logger.info(`Email enviado: ${previewUrl}`);
    return previewUrl;
  }
}
