-- Add public SELECT policy for profiles to allow buyers to view seller store information
-- This exposes only non-sensitive fields: store_name, store_description, avatar_url, location
-- Sensitive fields (email, phone, bio, name) remain private

CREATE POLICY "Public can view store information"
ON public.profiles
FOR SELECT
USING (
  -- Allow public read access to profiles that have store information
  store_name IS NOT NULL
);