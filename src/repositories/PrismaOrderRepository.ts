import { PrismaClient } from '@prisma/client';
import { IOrderRepository, CreateOrderData } from './IOrderRepository';

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateOrderData): Promise<{ id: number }> {
    const order = await this.prisma.order.create({
      data: {
        customer: data.customer,
        items: JSON.stringify(data.items), // o schema guarda como string
        total: data.total,
        status: data.status,
      },
    });
    return { id: order.id };
  }
}
