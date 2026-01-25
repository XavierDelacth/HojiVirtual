-- Remove restrictive policy that blocks all SELECT access and causes policy conflict
DROP POLICY IF EXISTS "Block anonymous access to purchases" ON public.purchases;