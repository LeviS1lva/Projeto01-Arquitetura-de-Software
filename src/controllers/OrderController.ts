import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { AppError } from '../errors/AppError';
import logger from '../lib/logger';

// Camada HTTP: recebe a request, chama o service, devolve a response.
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // arrow function para manter o `this` ao passar para o Express
  processOrder = async (req: Request, res: Response) => {
    try {
      const result = await this.orderService.processOrder(req.body);

      return res.json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(500).json({ error: 'Erro interno' });
    }
  };
}
