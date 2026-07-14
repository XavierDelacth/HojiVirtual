ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS item_fee          NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS processing_fee    NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS delivery_fee      NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS urgent_fee        NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS small_order_fee   NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS packaging_fee     NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS platform_revenue  NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seller_receives   NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS buyer_total       NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS payment_method    TEXT,
  ADD COLUMN IF NOT EXISTS transaction_id    TEXT,
  ADD COLUMN IF NOT EXISTS payment_status    TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS paid_at           TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS delivery_zone     TEXT,
  ADD COLUMN IF NOT EXISTS is_urgent         BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS with_packaging    BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.purchases.item_fee         IS 'Taxa por item cobrada pela plataforma (2% * subtotal * nº itens)';
COMMENT ON COLUMN public.purchases.processing_fee   IS 'Taxa de processamento cobrada pela plataforma (1.5% * subtotal)';
COMMENT ON COLUMN public.purchases.delivery_fee     IS 'Taxa de entrega fixa por zona';
COMMENT ON COLUMN public.purchases.platform_revenue IS 'Receita total da plataforma nesta compra';
COMMENT ON COLUMN public.purchases.seller_receives  IS 'Valor líquido que o vendedor recebe';
COMMENT ON COLUMN public.purchases.buyer_total      IS 'Valor total pago pelo comprador (produto + taxas)';
COMMENT ON COLUMN public.purchases.payment_method   IS 'multicaixa_express | unitel_money | bank_transfer';
COMMENT ON COLUMN public.purchases.payment_status   IS 'idle | pending | processing | approved | failed | cancelled';
COMMENT ON COLUMN public.purchases.transaction_id   IS 'ID da transacção gerado pelo simulador';
