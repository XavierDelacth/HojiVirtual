-- Add seller bank fields to products and bank fields to profiles

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS seller_store_name TEXT,
  ADD COLUMN IF NOT EXISTS seller_account_holder TEXT,
  ADD COLUMN IF NOT EXISTS seller_bank TEXT,
  ADD COLUMN IF NOT EXISTS seller_iban TEXT;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS account_holder TEXT,
  ADD COLUMN IF NOT EXISTS bank_name TEXT,
  ADD COLUMN IF NOT EXISTS iban TEXT;
