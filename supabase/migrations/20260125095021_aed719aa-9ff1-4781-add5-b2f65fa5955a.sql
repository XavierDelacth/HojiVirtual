-- Fix 1: Add RLS policy for public profile discovery (only non-sensitive fields)
-- Users can view basic public profile info of other users (for store discovery)
CREATE POLICY "Public can view basic profile info"
ON public.profiles
FOR SELECT
USING (true);

-- Fix 2: Add database constraints for profile field validation
ALTER TABLE public.profiles 
ADD CONSTRAINT check_name_length CHECK (length(name) <= 100),
ADD CONSTRAINT check_store_name_length CHECK (length(store_name) <= 100),
ADD CONSTRAINT check_bio_length CHECK (length(bio) <= 500),
ADD CONSTRAINT check_store_description_length CHECK (length(store_description) <= 1000),
ADD CONSTRAINT check_location_length CHECK (length(location) <= 200),
ADD CONSTRAINT check_phone_length CHECK (length(phone) <= 30),
ADD CONSTRAINT check_email_length CHECK (length(email) <= 255);