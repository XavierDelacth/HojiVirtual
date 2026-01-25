-- Drop the unused profiles_public view to reduce attack surface
-- The view is not being used by any application code
DROP VIEW IF EXISTS public.profiles_public;