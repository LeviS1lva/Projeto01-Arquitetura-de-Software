import { IPaymentMethod, PaymentDetails } from './IPaymentMethod';
import logger from '../lib/logger';

export class DebitCardPayment implements IPaymentMethod {
  async process(_details?: PaymentDetails): Promise<void> {
    logger.info('Processando débito...');
    // Lógica de débito
  }
}
