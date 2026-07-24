-- 009_business.sql
CREATE TABLE IF NOT EXISTS public.businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  status text DEFAULT 'active' CHECK (status IN ('active','paused','closed')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.business_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('revenue','expense','order')),
  amount numeric NOT NULL,
  category text,
  description text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.business_kpis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  value numeric NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_kpis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage businesses" ON public.businesses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage business_entries" ON public.business_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage business_kpis" ON public.business_kpis FOR ALL USING (auth.uid() = user_id);
