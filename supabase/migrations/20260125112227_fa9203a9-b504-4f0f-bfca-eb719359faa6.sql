-- Block anonymous access to purchases table
-- Only authenticated users can read purchase data
CREATE POLICY "Block anonymous access to purchases"
ON public.purchases
FOR SELECT
TO anon
USING (false);