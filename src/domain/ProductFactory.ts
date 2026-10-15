import { Product } from './IProduct';
import { PhysicalProduct } from './PhysicalProduct';
import { DigitalProduct } from './DigitalProduct';

// Formato do dado que vem do banco
export interface ProductData {
  id: number;
  name: string;
  type: string;
  price: number;
}

export class ProductFactory {
  static createProduct(data: ProductData): Product {
    switch (data.type) {
      case 'physical':
        return new PhysicalProduct(data.id, data.name, data.price);
      case 'digital':
        return new DigitalProduct(data.id, data.name, data.price);
      default:
        throw new Error(`Tipo de produto desconhecido: ${data.type}`);
    }
  }
}
