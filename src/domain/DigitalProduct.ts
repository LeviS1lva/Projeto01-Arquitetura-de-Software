import { Product } from './IProduct';

export class DigitalProduct implements Product {
  readonly type = 'digital';

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number
  ) {}

  // Produto digital não tem frete
  calculateFreight(): number {
    return 0;
  }
}
