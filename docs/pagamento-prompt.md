# Prompt para OpenCode — Sistema de Taxas e Simulador de Pagamento (HojiVirtual)

> **Contexto**: Este prompt deve ser colado directamente no OpenCode. Ele contém todas as instruções para implementar o sistema de receita principal (taxas) e um simulador de pagamento sem APIs reais, no projecto HojiVirtual (React + TypeScript + Supabase).

---

## O QUE PRECISAS DE SABER SOBRE O PROJECTO

O HojiVirtual é um marketplace angolano (React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Supabase). A moeda é **Kwanza (Kz)**. O idioma da UI é **Português**.

Actualmente o projecto **não cobra taxas** — apenas gera comprovativos PDF de transferência bancária directa entre comprador e vendedor. O objectivo desta tarefa é:

1. Criar um **motor de taxas** que calcule a receita da plataforma sobre cada compra.
2. Criar um **simulador de pagamento** que imite Multicaixa Express, Unitel Money e Transferência Bancária — sem APIs reais.
3. Integrar tudo no fluxo de checkout existente (`Carrinho.tsx` e `ProductDetails.tsx`).
4. Actualizar a base de dados (Supabase) para guardar taxas e estado de pagamento.
5. Actualizar o comprovativo PDF para mostrar o breakdown de taxas.

---

## TAREFA 1 — Criar `src/lib/feeEngine.ts`

Cria este ficheiro do zero. Ele deve exportar:

### 1.1 Configuração de taxas (constante)

```typescript
export const FEE_CONFIG = {
  // Taxa por item: percentagem aplicada ao preço de cada item
  itemFeePercent: 0.02, // 2%

  // Taxa de processamento: percentagem sobre o subtotal total
  processingFeePercent: 0.015, // 1.5%

  // Taxas de entrega fixas por zona (em Kz)
  deliveryFees: {
    zona1: 500,   // Luanda centro / Ingombota / Maianga
    zona2: 800,   // Viana / Kilamba / Cacuaco
    zona3: 1200,  // Talatona / Belas / Zango
  } as const,

  // Taxa adicional para entrega urgente (em Kz)
  urgentDeliveryFee: 600,

  // Taxa para pedidos abaixo do mínimo
  smallOrderThreshold: 2000, // Kz
  smallOrderFee: 300,        // Kz fixos

  // Taxa de embalagem por item (em Kz)
  packagingFeePerItem: 150,

  // Taxa de reagendamento de entrega (em Kz)
  rescheduleFee: 400,

  // Taxa de cancelamento após processamento (em Kz)
  cancellationFee: 500,

  // Taxa de troca de produto (em Kz)
  exchangeFee: 350,
};
```

### 1.2 Tipos a exportar

```typescript
export type DeliveryZone = keyof typeof FEE_CONFIG.deliveryFees;

export interface FeeCalculationParams {
  subtotal: number;       // Soma dos preços dos produtos (sem taxas)
  itemCount: number;      // Número total de itens
  deliveryZone?: DeliveryZone;
  isUrgent?: boolean;
  withPackaging?: boolean;
}

export interface FeeBreakdown {
  subtotal: number;
  itemFee: number;           // 2% * subtotal * itemCount (taxa por item)
  processingFee: number;     // 1.5% * subtotal
  deliveryFee: number;       // Fixo por zona (0 se sem entrega)
  urgentFee: number;         // 600 Kz se urgente, senão 0
  smallOrderFee: number;     // 300 Kz se subtotal < 2000, senão 0
  packagingFee: number;      // 150 Kz * itemCount se com embalagem, senão 0
  platformRevenue: number;   // Soma de todas as taxas (o que a plataforma fica)
  sellerReceives: number;    // subtotal - itemFee - processingFee (o que o vendedor recebe)
  buyerTotal: number;        // subtotal + platformRevenue (o que o comprador paga no total)
}
```

### 1.3 Função principal a exportar

```typescript
export function calculateFees(params: FeeCalculationParams): FeeBreakdown
```

Lógica:
- `itemFee = subtotal * itemFeePercent * itemCount`
- `processingFee = subtotal * processingFeePercent`
- `deliveryFee = deliveryZone ? deliveryFees[deliveryZone] : 0`
- `urgentFee = isUrgent ? urgentDeliveryFee : 0`
- `smallOrderFee = subtotal < smallOrderThreshold ? smallOrderFee : 0`
- `packagingFee = withPackaging ? packagingFeePerItem * itemCount : 0`
- `platformRevenue = itemFee + processingFee + deliveryFee + urgentFee + smallOrderFee + packagingFee`
- `sellerReceives = subtotal - itemFee - processingFee` (vendedor paga só as taxas de plataforma sobre o produto, não as de entrega/embalagem)
- `buyerTotal = subtotal + platformRevenue`

### 1.4 Função auxiliar de formatação

```typescript
export function formatKz(value: number): string {
  // Formata valor em Kwanza: "1.500 Kz" (ponto como separador de milhares)
  return `${value.toLocaleString('pt-AO')} Kz`;
}
```

---

## TAREFA 2 — Criar `src/lib/paymentSimulator.ts`

Cria este ficheiro do zero. Ele simula gateways de pagamento angolanos sem APIs reais.

### 2.1 Tipos a exportar

```typescript
export type PaymentMethod = 'multicaixa_express' | 'unitel_money' | 'bank_transfer';

export type PaymentStatus = 'idle' | 'pending' | 'processing' | 'approved' | 'failed' | 'cancelled';

export interface PaymentRequest {
  purchaseId: string;
  amount: number;          // valor total em Kz
  method: PaymentMethod;
  phone?: string;          // obrigatório para multicaixa_express e unitel_money
  iban?: string;           // obrigatório para bank_transfer
}

export interface PaymentStatusUpdate {
  status: PaymentStatus;
  message: string;
  transactionId?: string;
  paidAt?: string;         // ISO string, presente apenas quando status === 'approved'
}
```

### 2.2 Função `simulatePayment`

```typescript
export async function simulatePayment(req: PaymentRequest): Promise<PaymentStatusUpdate>
```

Comportamento:
- Aguarda entre 1500ms e 3000ms (simula latência de gateway).
- 88% de probabilidade de sucesso, 12% de falha (realismo).
- Em caso de sucesso: retorna `{ status: 'approved', transactionId: 'SIM-MÉTODO-TIMESTAMP', paidAt: ISO_STRING, message: '...' }`.
- Em caso de falha: retorna `{ status: 'failed', message: MOTIVO_ALEATÓRIO }`.

Motivos de falha por método (escolher aleatoriamente de uma lista):
- `multicaixa_express`: `['Saldo insuficiente', 'PIN incorreto', 'Serviço temporariamente indisponível', 'Limite diário excedido']`
- `unitel_money`: `['Saldo Unitel Money insuficiente', 'Número não registado no Unitel Money', 'Limite diário excedido', 'Conta bloqueada']`
- `bank_transfer`: `['IBAN inválido', 'Limite de transferência excedido', 'Banco de destino indisponível']`

Mensagens de sucesso:
- `multicaixa_express`: `'Pagamento aprovado via Multicaixa Express!'`
- `unitel_money`: `'Pagamento aprovado via Unitel Money!'`
- `bank_transfer`: `'Transferência bancária confirmada com sucesso!'`

### 2.3 Generator `streamPaymentStatus`

```typescript
export async function* streamPaymentStatus(
  req: PaymentRequest
): AsyncGenerator<PaymentStatusUpdate>
```

Este generator emite actualizações de estado em sequência, para mostrar feedback em tempo real na UI:

1. Emite imediatamente: `{ status: 'pending', message: 'A iniciar pagamento...' }`
2. Aguarda 600ms. Emite: `{ status: 'processing', message: MENSAGEM_PROCESSAMENTO_DO_MÉTODO }`
3. Aguarda entre 1200ms e 2500ms. Emite o resultado final (approved ou failed) de `simulatePayment`.

Mensagens de processamento por método:
- `multicaixa_express`: `'A aguardar confirmação no terminal Multicaixa...'`
- `unitel_money`: `'A verificar saldo e a processar via Unitel Money...'`
- `bank_transfer`: `'A processar transferência bancária. Aguarde...'`

---

## TAREFA 3 — Criar Migração SQL

Cria o ficheiro `supabase/migrations/20260630000000_add_fees_and_payment_to_purchases.sql`:

```sql
-- Adiciona colunas de taxas e pagamento à tabela purchases

ALTER TABLE public.purchases
  -- === TAXAS ===
  ADD COLUMN IF NOT EXISTS item_fee          NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS processing_fee    NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS delivery_fee      NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS urgent_fee        NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS small_order_fee   NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS packaging_fee     NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS platform_revenue  NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seller_receives   NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS buyer_total       NUMERIC NOT NULL DEFAULT 0,

  -- === PAGAMENTO ===
  ADD COLUMN IF NOT EXISTS payment_method    TEXT,
  ADD COLUMN IF NOT EXISTS transaction_id    TEXT,
  ADD COLUMN IF NOT EXISTS payment_status    TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS paid_at           TIMESTAMPTZ,

  -- === ENTREGA ===
  ADD COLUMN IF NOT EXISTS delivery_zone     TEXT,
  ADD COLUMN IF NOT EXISTS is_urgent         BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS with_packaging    BOOLEAN NOT NULL DEFAULT false;

-- Comentários para documentação
COMMENT ON COLUMN public.purchases.item_fee         IS 'Taxa por item cobrada pela plataforma (2% * subtotal * nº itens)';
COMMENT ON COLUMN public.purchases.processing_fee   IS 'Taxa de processamento cobrada pela plataforma (1.5% * subtotal)';
COMMENT ON COLUMN public.purchases.delivery_fee     IS 'Taxa de entrega fixa por zona';
COMMENT ON COLUMN public.purchases.platform_revenue IS 'Receita total da plataforma nesta compra';
COMMENT ON COLUMN public.purchases.seller_receives  IS 'Valor líquido que o vendedor recebe';
COMMENT ON COLUMN public.purchases.buyer_total      IS 'Valor total pago pelo comprador (produto + taxas)';
COMMENT ON COLUMN public.purchases.payment_method   IS 'multicaixa_express | unitel_money | bank_transfer';
COMMENT ON COLUMN public.purchases.payment_status   IS 'idle | pending | processing | approved | failed | cancelled';
COMMENT ON COLUMN public.purchases.transaction_id   IS 'ID da transacção gerado pelo simulador';
```

---

## TAREFA 4 — Criar Componente `src/components/checkout/FeeBreakdown.tsx`

Componente React que mostra o resumo de taxas antes de o comprador confirmar. Usa os tipos de `feeEngine.ts`.

### Props

```typescript
interface FeeBreakdownProps {
  fees: FeeBreakdown; // importado de feeEngine.ts
  className?: string;
}
```

### UI a implementar

- Um card com fundo subtil (`bg-orange-50 border border-orange-200 rounded-xl p-4`).
- Título: "Resumo do Pagamento" em negrito.
- Lista de linhas: cada linha mostra label à esquerda e valor à direita.
  - "Subtotal" → `fees.subtotal`
  - "Taxa por item (2%)" → `fees.itemFee` (mostrar apenas se > 0)
  - "Taxa de processamento (1,5%)" → `fees.processingFee` (mostrar apenas se > 0)
  - "Taxa de entrega" → `fees.deliveryFee` (mostrar apenas se > 0)
  - "Entrega urgente" → `fees.urgentFee` (mostrar apenas se > 0)
  - "Pedido mínimo" → `fees.smallOrderFee` (mostrar apenas se > 0)
  - "Embalagem" → `fees.packagingFee` (mostrar apenas se > 0)
- Separador `<hr>`.
- Linha de total em destaque: "**Total a pagar**" → `fees.buyerTotal` em laranja/negrito.
- Nota em texto pequeno cinzento: "O vendedor recebe `fees.sellerReceives` Kz após deduções da plataforma."
- Todos os valores formatados com `formatKz()` de `feeEngine.ts`.

---

## TAREFA 5 — Criar Componente `src/components/checkout/DeliveryOptions.tsx`

Componente para o comprador escolher opções de entrega.

### Props

```typescript
interface DeliveryOptionsProps {
  selectedZone: DeliveryZone | undefined;
  onZoneChange: (zone: DeliveryZone | undefined) => void;
  isUrgent: boolean;
  onUrgentChange: (val: boolean) => void;
  withPackaging: boolean;
  onPackagingChange: (val: boolean) => void;
}
```

### UI

- Secção "Entrega":
  - Radio group com 4 opções: "Sem entrega (levantamento)", "Zona 1 — Luanda Centro (500 Kz)", "Zona 2 — Viana / Kilamba (800 Kz)", "Zona 3 — Talatona / Belas (1.200 Kz)".
  - Usar `RadioGroup` e `RadioGroupItem` do shadcn/ui.
  - Quando "Sem entrega" está seleccionado, `onZoneChange(undefined)`.

- Secção "Opções adicionais":
  - Checkbox "Entrega urgente (+600 Kz)" — visível só se uma zona estiver seleccionada.
  - Checkbox "Embalagem protegida (+150 Kz/item)".
  - Usar `Checkbox` do shadcn/ui.

---

## TAREFA 6 — Criar Componente `src/components/checkout/PaymentMethodSelector.tsx`

Componente para o comprador escolher o método de pagamento.

### Props

```typescript
interface PaymentMethodSelectorProps {
  selected: PaymentMethod | undefined;
  onSelect: (method: PaymentMethod) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
}
```

### UI

Três cards clicáveis (um por método). Quando seleccionado, destaca com borda laranja (`border-orange-500`).

**Multicaixa Express**
- Ícone Lucide: `CreditCard`
- Título: "Multicaixa Express"
- Descrição: "Pagamento instantâneo via rede Multicaixa"
- Quando seleccionado: mostra input para número de telefone (label: "Número de telefone (9XX XXX XXX)").

**Unitel Money**
- Ícone Lucide: `Smartphone`
- Título: "Unitel Money"
- Descrição: "Carteira digital da operadora Unitel"
- Quando seleccionado: mostra input para número Unitel.

**Transferência Bancária**
- Ícone Lucide: `Building2`
- Título: "Transferência Bancária (IBAN)"
- Descrição: "Transferência directa para a conta do vendedor"
- Quando seleccionado: mostra informação "O IBAN do vendedor será exibido no comprovativo."

---

## TAREFA 7 — Criar Componente `src/components/checkout/PaymentStatusModal.tsx`

Modal com animação que mostra o progresso do pagamento em tempo real usando o `streamPaymentStatus` generator.

### Props

```typescript
interface PaymentStatusModalProps {
  isOpen: boolean;
  paymentRequest: PaymentRequest | null;
  onSuccess: (transactionId: string) => void;
  onFailure: (reason: string) => void;
  onClose: () => void;
}
```

### Comportamento

- Quando `isOpen` muda para `true` e `paymentRequest` não é null, inicia o `streamPaymentStatus` generator num `useEffect`.
- Itera o generator com `for await...of` e vai actualizando o estado local `currentStatus`.
- Quando o status é `approved`, chama `onSuccess(transactionId)` após 800ms (para o utilizador ver o estado de sucesso).
- Quando o status é `failed`, chama `onFailure(message)` após 1500ms.

### UI dos estados

**`pending`**: Spinner circular + "A iniciar pagamento..."

**`processing`**: Spinner circular animado (laranja) + mensagem de processamento + subtexto: "Por favor não feches esta janela"

**`approved`**: Ícone `CheckCircle` verde (tamanho grande) + "Pagamento confirmado!" + valor pago + ID da transacção em texto pequeno

**`failed`**: Ícone `XCircle` vermelho + "Pagamento falhado" + motivo da falha + botão "Tentar novamente" (que chama `onClose`) + botão "Cancelar"

Usar `Dialog` do shadcn/ui. Não permitir fechar o modal quando está em `processing`.

---

## TAREFA 8 — Modificar `src/pages/Carrinho.tsx`

Integra as novas funcionalidades no fluxo do carrinho.

### Novos estados a adicionar ao componente

```typescript
const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | undefined>(undefined);
const [isUrgent, setIsUrgent] = useState(false);
const [withPackaging, setWithPackaging] = useState(false);
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | undefined>(undefined);
const [payerPhone, setPayerPhone] = useState('');
const [fees, setFees] = useState<FeeBreakdown | null>(null);
const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
```

### Recalcular taxas sempre que opções mudam

```typescript
useEffect(() => {
  if (cartItems.length === 0) { setFees(null); return; }
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  setFees(calculateFees({ subtotal, itemCount, deliveryZone, isUrgent, withPackaging }));
}, [cartItems, deliveryZone, isUrgent, withPackaging]);
```

### Onde inserir os novos componentes no JSX

No modal/secção de checkout (antes do botão "Finalizar Compra"), adicionar pela seguinte ordem:

1. `<DeliveryOptions .../>` — para escolher zona e opções.
2. `<FeeBreakdown fees={fees} />` — para mostrar o resumo de taxas (mostrar apenas se `fees !== null`).
3. `<PaymentMethodSelector .../>` — para escolher método de pagamento.
4. Botão "Confirmar e Pagar" (substituir ou complementar o botão actual):
   - Desabilitado se `selectedPaymentMethod === undefined`.
   - Ao clicar: constrói o `PaymentRequest` e abre o `PaymentStatusModal`.

### Ao construir o `PaymentRequest`

```typescript
const handleConfirmPayment = () => {
  if (!selectedPaymentMethod || !fees) return;
  setPaymentRequest({
    purchaseId: `CART-${Date.now()}`,
    amount: fees.buyerTotal,
    method: selectedPaymentMethod,
    phone: payerPhone || undefined,
  });
  setIsPaymentModalOpen(true);
};
```

### Callback `onSuccess` do modal

Quando o pagamento é aprovado:
1. Criar o registo em `purchases` no Supabase **com todos os campos de taxas preenchidos** (usar os valores do objecto `fees`).
2. Guardar também no localStorage (`hoji_purchases`) como já existe.
3. Fechar o modal.
4. Mostrar toast de sucesso: "Compra concluída com sucesso! Podes descarregar o teu comprovativo."
5. Abrir o modal de comprovativo existente.

### Campos adicionais a guardar no Supabase (além dos já existentes)

```typescript
{
  // ... campos existentes ...
  item_fee: fees.itemFee,
  processing_fee: fees.processingFee,
  delivery_fee: fees.deliveryFee,
  urgent_fee: fees.urgentFee,
  small_order_fee: fees.smallOrderFee,
  packaging_fee: fees.packagingFee,
  platform_revenue: fees.platformRevenue,
  seller_receives: fees.sellerReceives,
  buyer_total: fees.buyerTotal,
  payment_method: selectedPaymentMethod,
  transaction_id: transactionId, // recebido no onSuccess
  payment_status: 'approved',
  paid_at: new Date().toISOString(),
  delivery_zone: deliveryZone ?? null,
  is_urgent: isUrgent,
  with_packaging: withPackaging,
}
```

---

## TAREFA 9 — Modificar `src/pages/ProductDetails.tsx`

Aplicar a mesma lógica de taxas e simulador ao fluxo "Adquira Já" de produto individual.

- Adicionar os mesmos estados de opções de entrega e método de pagamento.
- Antes de mostrar os dados bancários do vendedor, mostrar `<DeliveryOptions>`, `<FeeBreakdown>` e `<PaymentMethodSelector>`.
- Substituir a chamada directa de `handleGenerateReceipt` pelo `handleConfirmPayment` que abre o `PaymentStatusModal`.
- Na lógica `onSuccess`, guardar no Supabase com todos os campos de taxas (como na Tarefa 8).

---

## TAREFA 10 — Actualizar `src/utils/pdfGenerator.ts` (ou o componente `Comprovativo.tsx`)

O comprovativo PDF deve agora incluir o breakdown de taxas.

No HTML que é capturado pelo `html2canvas`, adicionar uma secção "Detalhe de Taxas" com:

```
Subtotal:              X.XXX Kz
Taxa de plataforma:      XXX Kz
Taxa de entrega:         XXX Kz
─────────────────────────────
Total pago:            X.XXX Kz
Método de pagamento:   Multicaixa Express
ID de transacção:      SIM-MULTICAIXA_EXPRESS-1234567890
```

Mostrar também o `seller_receives` como "Valor recebido pelo vendedor: X.XXX Kz" em nota de rodapé discreta.

---

## REGRAS GERAIS A SEGUIR

1. **Não quebrar funcionalidade existente.** O fluxo de transferência bancária directa (sem simulador) deve continuar a funcionar para compatibilidade retroactiva.

2. **TypeScript strict.** Todos os ficheiros novos devem ter tipos explícitos. Sem `any`.

3. **Português em toda a UI.** Todos os textos visíveis ao utilizador devem estar em Português.

4. **Kwanza formatado correctamente.** Usar `formatKz()` do `feeEngine.ts` em toda a UI. Nunca mostrar valores sem unidade.

5. **Usar componentes shadcn/ui existentes.** O projecto já tem `Dialog`, `RadioGroup`, `Checkbox`, `Button`, `Input`, `Badge`. Não instalar bibliotecas novas desnecessárias.

6. **Cores do tema HojiVirtual.** A cor primária é laranja (`orange-500` / `#FF6B35`). Sucesso em verde (`green-500`). Erro em vermelho (`red-500`).

7. **Responsivo.** Todos os componentes devem funcionar em mobile (a maioria dos utilizadores angolanos usa smartphone).

8. **Sem APIs externas novas.** O simulador deve ser 100% local, sem chamadas a serviços de terceiros.

9. **Manter localStorage como fallback.** Qualquer dado guardado no Supabase deve também ser guardado no localStorage como fallback offline.

10. **Testar os cálculos.** Após implementar o `feeEngine.ts`, verificar manualmente com este exemplo:
    - Subtotal: 5.000 Kz, 2 itens, Zona 2, urgente, com embalagem
    - `itemFee` = 5000 * 0.02 * 2 = 200 Kz
    - `processingFee` = 5000 * 0.015 = 75 Kz
    - `deliveryFee` = 800 Kz
    - `urgentFee` = 600 Kz
    - `smallOrderFee` = 0 Kz (5000 > 2000)
    - `packagingFee` = 150 * 2 = 300 Kz
    - `platformRevenue` = 200 + 75 + 800 + 600 + 0 + 300 = 1.975 Kz
    - `sellerReceives` = 5000 - 200 - 75 = 4.725 Kz
    - `buyerTotal` = 5000 + 1975 = 6.975 Kz

---

## ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

```
1. feeEngine.ts                          (sem dependências)
2. paymentSimulator.ts                   (sem dependências)
3. Migração SQL                          (aplicar ao Supabase)
4. FeeBreakdown.tsx                      (depende de feeEngine.ts)
5. DeliveryOptions.tsx                   (depende de feeEngine.ts)
6. PaymentMethodSelector.tsx             (depende de paymentSimulator.ts)
7. PaymentStatusModal.tsx                (depende de paymentSimulator.ts)
8. Carrinho.tsx                          (integra todos os componentes)
9. ProductDetails.tsx                    (integra todos os componentes)
10. pdfGenerator.ts / Comprovativo.tsx   (actualizar PDF)
```

---

## ESTRUTURA FINAL DE FICHEIROS NOVOS/MODIFICADOS

```
src/
├── lib/
│   ├── feeEngine.ts                      ← CRIAR (Tarefa 1)
│   ├── paymentSimulator.ts               ← CRIAR (Tarefa 2)
│   └── resolveBankData.ts                (não modificar)
│
├── components/
│   └── checkout/                         ← CRIAR PASTA
│       ├── FeeBreakdown.tsx              ← CRIAR (Tarefa 4)
│       ├── DeliveryOptions.tsx           ← CRIAR (Tarefa 5)
│       ├── PaymentMethodSelector.tsx     ← CRIAR (Tarefa 6)
│       └── PaymentStatusModal.tsx        ← CRIAR (Tarefa 7)
│
├── pages/
│   ├── Carrinho.tsx                      ← MODIFICAR (Tarefa 8)
│   └── ProductDetails.tsx                ← MODIFICAR (Tarefa 9)
│
└── utils/
    └── pdfGenerator.ts                   ← MODIFICAR (Tarefa 10)

supabase/
└── migrations/
    └── 20260630000000_add_fees_and_payment_to_purchases.sql  ← CRIAR (Tarefa 3)
```
