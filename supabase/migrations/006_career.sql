-- 006_career.sql
CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  status text DEFAULT 'applied' CHECK (status IN ('researching','applied','screening','interview','offer','rejected','accepted','withdrawn')),
  applied_date date,
  salary_offered numeric,
  currency text DEFAULT 'NGN',
  url text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.job_applications(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  round text NOT NULL,
  scheduled_at timestamptz,
  notes text,
  outcome text CHECK (outcome IN ('passed','failed','pending',NULL)),
  lessons text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.networking_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  company text,
  role text,
  platform text,
  last_contact date,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.salary_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company text,
  role text,
  salary numeric,
  currency text DEFAULT 'NGN',
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.networking_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage job_applications" ON public.job_applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage interviews" ON public.interviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage networking_contacts" ON public.networking_contacts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage salary_history" ON public.salary_history FOR ALL USING (auth.uid() = user_id);
