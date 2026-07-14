export type PaymentMethod = 'multicaixa_express' | 'unitel_money' | 'bank_transfer';

export type PaymentStatus = 'idle' | 'pending' | 'processing' | 'approved' | 'failed' | 'cancelled';

export interface PaymentRequest {
  purchaseId: string;
  amount: number;
  method: PaymentMethod;
  phone?: string;
  iban?: string;
}

export interface PaymentStatusUpdate {
  status: PaymentStatus;
  message: string;
  transactionId?: string;
  paidAt?: string;
}

const FAILURE_REASONS: Record<PaymentMethod, string[]> = {
  multicaixa_express: [
    'Saldo insuficiente',
    'PIN incorreto',
    'Serviço temporariamente indisponível',
    'Limite diário excedido',
  ],
  unitel_money: [
    'Saldo Unitel Money insuficiente',
    'Número não registado no Unitel Money',
    'Limite diário excedido',
    'Conta bloqueada',
  ],
  bank_transfer: [
    'IBAN inválido',
    'Limite de transferência excedido',
    'Banco de destino indisponível',
  ],
};

const SUCCESS_MESSAGES: Record<PaymentMethod, string> = {
  multicaixa_express: 'Pagamento aprovado via Multicaixa Express!',
  unitel_money: 'Pagamento aprovado via Unitel Money!',
  bank_transfer: 'Transferência bancária confirmada com sucesso!',
};

export async function simulatePayment(req: PaymentRequest): Promise<PaymentStatusUpdate> {
  const delay = 1500 + Math.random() * 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const isSuccess = Math.random() < 0.88;

  if (isSuccess) {
    const timestamp = Date.now();
    return {
      status: 'approved',
      message: SUCCESS_MESSAGES[req.method],
      transactionId: `SIM-${req.method.toUpperCase()}-${timestamp}`,
      paidAt: new Date().toISOString(),
    };
  }

  const reasons = FAILURE_REASONS[req.method];
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  return {
    status: 'failed',
    message: reason,
  };
}

const PROCESSING_MESSAGES: Record<PaymentMethod, string> = {
  multicaixa_express: 'A aguardar confirmação no terminal Multicaixa...',
  unitel_money: 'A verificar saldo e a processar via Unitel Money...',
  bank_transfer: 'A processar transferência bancária. Aguarde...',
};

export async function* streamPaymentStatus(
  req: PaymentRequest
): AsyncGenerator<PaymentStatusUpdate> {
  yield { status: 'pending', message: 'A iniciar pagamento...' };

  await new Promise((resolve) => setTimeout(resolve, 600));

  yield {
    status: 'processing',
    message: PROCESSING_MESSAGES[req.method],
  };

  const processingDelay = 1200 + Math.random() * 1300;
  await new Promise((resolve) => setTimeout(resolve, processingDelay));

  const result = await simulatePayment(req);
  yield result;
}
