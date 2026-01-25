-- Drop the token-based policy that's not working correctly
DROP POLICY IF EXISTS "Public can view purchase with valid token" ON public.purchases;

-- The purchases table should NOT be publicly accessible
-- Authenticated users can only see their own purchases via the existing "Buyers can view their own purchases" policy
-- The edge function uses service_role key to bypass RLS for receipt viewing with token validation