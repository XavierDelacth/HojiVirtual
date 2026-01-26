-- Fix profiles table RLS: Convert to proper PERMISSIVE policy for authenticated users
-- Drop existing SELECT policies
DROP POLICY IF EXISTS "Deny anonymous access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create PERMISSIVE SELECT policy for authenticated users only
-- This explicitly grants access ONLY to authenticated users viewing their own profile
-- Anonymous users have NO permissive policy = NO access
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Fix purchases table RLS: Same issue - convert to proper PERMISSIVE policy
DROP POLICY IF EXISTS "Buyers can view their own purchases" ON public.purchases;

-- Create PERMISSIVE SELECT policy for authenticated buyers only
CREATE POLICY "Buyers can view their own purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (auth.uid() = buyer_id);