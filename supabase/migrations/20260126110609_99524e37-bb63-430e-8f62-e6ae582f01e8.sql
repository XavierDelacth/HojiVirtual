-- Fix: Add explicit policy to deny anonymous access to profiles table
-- This addresses the PUBLIC_USER_DATA security issue by making the security posture explicit

-- Add explicit denial policy for anonymous users on profiles table
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Note: The existing RESTRICTIVE policies already effectively block anonymous access
-- because auth.uid() returns NULL for anon users, making (NULL = user_id) falsy.
-- However, this explicit PERMISSIVE policy with USING (false) makes the denial clear
-- and prevents any potential confusion or future policy conflicts.