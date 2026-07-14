ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS gift_wrap_fee   NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS with_gift_wrap  BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.purchases.gift_wrap_fee  IS 'Taxa fixa de saco para presente (1.500 Kz)';
COMMENT ON COLUMN public.purchases.with_gift_wrap IS 'Indica se o comprador optou por saco para presente';
