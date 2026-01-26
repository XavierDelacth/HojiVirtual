-- Fix: Restrict public access to profiles table to prevent sensitive data exposure
-- This addresses the PUBLIC_USER_DATA security issue

-- Step 1: Drop the overly permissive public policy
DROP POLICY IF EXISTS "Public can view store information" ON public.profiles;

-- Step 2: Create a secure view that only exposes safe store fields
-- Excludes sensitive fields: email, phone, name, bio
CREATE VIEW public.profiles_store_public
WITH (security_invoker = on) AS
SELECT 
  id,
  user_id,
  avatar_url,
  location,
  store_name,
  store_description,
  created_at,
  updated_at
FROM public.profiles
WHERE store_name IS NOT NULL;

-- Step 3: Grant SELECT access to the view
GRANT SELECT ON public.profiles_store_public TO anon, authenticated;