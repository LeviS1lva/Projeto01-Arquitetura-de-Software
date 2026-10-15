import { IProductRepository } from '../repositories/IProductRepository';
import { IOrderRepository, OrderItemRecord } from '../repositories/IOrderRepository';
import { IPaymentMethod, PaymentDetails } from '../payments/IPaymentMethod';
import { NotificationService } from './NotificationService';
import { ProductFactory } from '../domain/ProductFactory';
import { Product } from '../domain/IProduct';
import { AppError } from '../errors/AppError';
import logger from '../lib/logger';

export interface OrderInput {
  customer: string;
  items: { productId: number; quantity: number }[];
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
}

export interface OrderResult {
  orderId: number;
  emailPreview: string | null;
}

// Orquestra o fluxo: Valida -> Calcula -> Paga -> Salva -> Notifica
export class OrderService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly paymentMethods: Map<string, IPaymentMethod>,
    private readonly notificationService: NotificationService
  ) {}

  async processOrder(input: OrderInput): Promise<OrderResult> {
    const { customer, items, paymentMethod, paymentDetails } = input;

    // 1. Validação
    if (!items || items.length === 0) {
      logger.error('Tentativa de pedido sem itens');
      throw new AppError('Carrinho vazio', 400);
    }

    // 2. Cálculo de preço e frete (polimorfismo: sem if por tipo)
    let totalAmount = 0;
    const products: Product[] = [];
    const records: OrderItemRecord[] = [];

    for (const item of items) {
      const data = await this.productRepository.findById(item.productId);
      if (!data) {
        throw new AppError(`Produto ${item.productId} não encontrado`, 400);
      }

      const product = ProductFactory.createProduct(data);
      totalAmount += product.price * item.quantity + product.calculateFreight();

      products.push(product);
      records.push({
        id: product.id,
        name: product.name,
        type: product.type,
        price: product.price,
        quantity: item.quantity,
      });
    }

    // 3. Pagamento (estratégia escolhida pelo nome, sem if/else)
    const payment = this.paymentMethods.get(paymentMethod);
    if (!payment) {
      throw new AppError('Método de pagamento não suportado', 400);
    }
    await payment.process(paymentDetails);

    // 4. Persistência
    const order = await this.orderRepository.create({
      customer,
      items: records,
      total: totalAmount,
      status: 'confirmed',
    });

    // 5. Notificação
    const emailPreview = await this.notificationService.sendOrderConfirmation(
      customer,
      order.id,
      totalAmount,
      products
    );

    return { orderId: order.id, emailPreview };
  }
}
