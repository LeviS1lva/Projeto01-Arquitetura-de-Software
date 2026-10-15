export interface OrderItemRecord {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
}

export interface CreateOrderData {
  customer: string;
  items: OrderItemRecord[];
  total: number;
  status: string;
}

// Abstração: o OrderService não sabe que o Prisma existe.
export interface IOrderRepository {
  create(data: CreateOrderData): Promise<{ id: number }>;
}
