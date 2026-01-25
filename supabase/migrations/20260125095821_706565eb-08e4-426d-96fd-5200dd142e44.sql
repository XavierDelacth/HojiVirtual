-- Fix profiles table: Recreate SELECT policy to explicitly require authentication
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Fix purchases table: Recreate SELECT policy to explicitly require authentication
DROP POLICY IF EXISTS "Buyers can view their own purchases" ON public.purchases;
CREATE POLICY "Buyers can view their own purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (auth.uid() = buyer_id);