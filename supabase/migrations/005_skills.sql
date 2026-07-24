-- 005_skills.sql
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  current_level int DEFAULT 1 CHECK (current_level BETWEEN 1 AND 5),
  target_level int DEFAULT 5 CHECK (target_level BETWEEN 1 AND 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, name)
);

CREATE TABLE IF NOT EXISTS public.skill_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id uuid REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  evidence_type text NOT NULL CHECK (evidence_type IN ('project','certification','course','interview','deployment')),
  reference_id uuid,
  description text NOT NULL,
  date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_evidence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage skills" ON public.skills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage skill_evidence" ON public.skill_evidence FOR ALL USING (auth.uid() = user_id);
