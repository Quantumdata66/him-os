-- 003_planning.sql
CREATE TABLE IF NOT EXISTS public.goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('life','career','financial','health','business')),
  title text NOT NULL,
  description text,
  metric_name text NOT NULL,
  metric_target numeric NOT NULL,
  target_date date,
  status text DEFAULT 'active' CHECK (status IN ('active','completed','paused','abandoned')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  objective text,
  status text DEFAULT 'planning' CHECK (status IN ('planning','active','paused','completed','archived')),
  repo_url text,
  deployment_url text,
  tech_stack text[],
  architecture_notes text,
  lessons text,
  started_at date NOT NULL,
  completed_at date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  completed boolean DEFAULT false,
  due_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage goals" ON public.goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage projects" ON public.projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage project_milestones" ON public.project_milestones FOR ALL USING (auth.uid() = user_id);
