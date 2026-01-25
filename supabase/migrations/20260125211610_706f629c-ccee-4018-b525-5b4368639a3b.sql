-- Add buyer_phone column to purchases table
ALTER TABLE public.purchases 
ADD COLUMN buyer_phone text;