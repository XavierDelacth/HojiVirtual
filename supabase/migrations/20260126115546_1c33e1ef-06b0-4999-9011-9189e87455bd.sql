-- Create ratings table for product reviews
CREATE TABLE public.ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id uuid NOT NULL REFERENCES public.purchases(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  store_id text,
  buyer_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(purchase_id)
);

-- Enable RLS
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Users can view their own ratings
CREATE POLICY "Users can view their own ratings"
ON public.ratings
FOR SELECT
TO authenticated
USING (auth.uid() = buyer_id);

-- Users can insert ratings for their purchases
CREATE POLICY "Users can create ratings for their purchases"
ON public.ratings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = buyer_id);

-- Users can update their own ratings
CREATE POLICY "Users can update their own ratings"
ON public.ratings
FOR UPDATE
TO authenticated
USING (auth.uid() = buyer_id);