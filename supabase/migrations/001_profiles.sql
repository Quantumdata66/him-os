-- 001_profiles.sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  motto text DEFAULT 'Prototype Today. Legacy Tomorrow.',
  timezone text DEFAULT 'UTC',
  preferred_currency text DEFAULT 'NGN',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);
