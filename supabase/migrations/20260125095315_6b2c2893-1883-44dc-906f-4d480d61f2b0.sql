-- Remove the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Public can view basic profile info" ON public.profiles;

-- Create a secure view that only exposes non-sensitive fields for store discovery
CREATE VIEW public.profiles_public
WITH (security_invoker = on) AS
SELECT 
  id,
  user_id,
  name,
  avatar_url,
  bio,
  location,
  store_name,
  store_description,
  created_at
FROM public.profiles;
-- Note: email and phone are intentionally excluded for privacy

-- Grant access to the public view
GRANT SELECT ON public.profiles_public TO anon, authenticated;