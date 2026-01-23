-- Remove the public SELECT policy that exposes sensitive user data
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- The existing "Users can view their own profile" policy will remain,
-- ensuring users can only view their own profile data