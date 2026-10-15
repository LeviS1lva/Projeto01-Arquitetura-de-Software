// Contrato do produto (LSP): qualquer implementação pode ser usada no lugar da outra.
export interface Product {
  readonly id: number;
  readonly name: string;
  readonly type: string;
  readonly price: number;
  calculateFreight(): number;
}
