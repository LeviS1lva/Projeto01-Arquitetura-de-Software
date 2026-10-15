import { IPaymentMethod, PaymentDetails } from './IPaymentMethod';
import { AppError } from '../errors/AppError';
import logger from '../lib/logger';

export class CreditCardPayment implements IPaymentMethod {
  async process(details?: PaymentDetails): Promise<void> {
    if (!details?.cardNumber || !details.cvv) {
      throw new AppError('Dados do cartão inválidos', 400);
    }

    logger.info(`Processando cartão final ${details.cardNumber.slice(-4)}`);

    // Simulação de gateway
    if (details.cvv === '000') throw new Error('Cartão recusado');
  }
}
