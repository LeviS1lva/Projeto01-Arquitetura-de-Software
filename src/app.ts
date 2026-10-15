import express from 'express';
import { PrismaClient } from '@prisma/client';

import { OrderController } from './controllers/OrderController';
import { OrderService } from './services/OrderService';
import { NotificationService } from './services/NotificationService';
import { EtherealMailProvider } from './providers/EtherealMailProvider';
import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { PrismaProductRepository } from './repositories/PrismaProductRepository';
import { IPaymentMethod } from './payments/IPaymentMethod';
import { CreditCardPayment } from './payments/CreditCardPayment';
import { DebitCardPayment } from './payments/DebitCardPayment';

// ---- Composition root: único lugar que conhece as classes concretas ----
const prisma = new PrismaClient();

const productRepository = new PrismaProductRepository(prisma);
const orderRepository = new PrismaOrderRepository(prisma);

const mailProvider = new EtherealMailProvider();
const notificationService = new NotificationService(mailProvider);

// Para adicionar Pix: criar PixPayment e registrar uma linha aqui.
const paymentMethods = new Map<string, IPaymentMethod>([
  ['credit_card', new CreditCardPayment()],
  ['debit_card', new DebitCardPayment()],
]);

const orderService = new OrderService(
  productRepository,
  orderRepository,
  paymentMethods,
  notificationService
);
const orderController = new OrderController(orderService);

// ---- Express ----
const app = express();
app.use(express.json());

app.post('/orders', orderController.processOrder);

export default app;
