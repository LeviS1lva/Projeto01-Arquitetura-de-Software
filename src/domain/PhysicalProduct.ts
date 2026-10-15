import { Product } from './IProduct';

export class PhysicalProduct implements Product {
  readonly type = 'physical';

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number
  ) {}

  // Produto físico cobra frete fixo (mesmo valor do código legado)
  calculateFreight(): number {
    return 10;
  }
}
