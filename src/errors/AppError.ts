// Erro de negócio/validação: o controller converte em resposta HTTP com o status certo.
export class AppError extends Error {
  constructor(message: string, public readonly statusCode: number = 400) {
    super(message);
    this.name = 'AppError';
  }
}
