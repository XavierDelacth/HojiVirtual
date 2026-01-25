-- Add DELETE policy allowing users to delete their own profile (GDPR compliance)
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);