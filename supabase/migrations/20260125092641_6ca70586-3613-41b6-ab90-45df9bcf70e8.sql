-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view purchase receipt by ID" ON public.purchases;

-- Add secure_token column for public receipt access
ALTER TABLE public.purchases ADD COLUMN IF NOT EXISTS secure_token TEXT UNIQUE DEFAULT gen_random_uuid()::text;

-- Create policy that allows public access ONLY with matching token in URL
-- This requires the token to be passed as a query parameter
CREATE POLICY "Public can view purchase with valid token"
ON public.purchases
FOR SELECT
TO public
USING (
  secure_token IS NOT NULL AND
  secure_token = current_setting('request.query.token', true)
);