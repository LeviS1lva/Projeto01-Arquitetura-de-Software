import { PrismaClient } from '@prisma/client';
import { IProductRepository } from './IProductRepository';
import { ProductData } from '../domain/ProductFactory';

export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: number): Promise<ProductData | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
