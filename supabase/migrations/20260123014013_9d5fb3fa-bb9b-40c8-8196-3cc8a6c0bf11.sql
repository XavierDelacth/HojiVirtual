-- Create purchases table to store transaction data
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  buyer_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL,
  store_name TEXT NOT NULL,
  store_id TEXT,
  product_id TEXT NOT NULL,
  product_image TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  validated_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '3 hours'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Policy for buyers to view their own purchases
CREATE POLICY "Buyers can view their own purchases"
ON public.purchases
FOR SELECT
USING (auth.uid() = buyer_id);

-- Policy for buyers to create purchases
CREATE POLICY "Authenticated users can create purchases"
ON public.purchases
FOR INSERT
WITH CHECK (auth.uid() = buyer_id);

-- Public policy to view purchase by ID (for QR code scanning - anyone with the link can view the receipt)
CREATE POLICY "Anyone can view purchase receipt by ID"
ON public.purchases
FOR SELECT
USING (true);

-- Policy for updating purchase status (validation)
CREATE POLICY "Buyers can update their own purchases"
ON public.purchases
FOR UPDATE
USING (auth.uid() = buyer_id);