-- 002_execution.sql
CREATE TABLE IF NOT EXISTS public.daily_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  morning_intention text,
  mit_1 text, mit_1_done boolean DEFAULT false,
  mit_2 text, mit_2_done boolean DEFAULT false,
  mit_3 text, mit_3_done boolean DEFAULT false,
  reflection text,
  gratitude text,
  blockers text,
  tomorrow_plan text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS public.weekly_sprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_start date NOT NULL,
  sprint_goal text NOT NULL,
  deliverables jsonb DEFAULT '[]',
  hours_planned numeric DEFAULT 0,
  hours_completed numeric DEFAULT 0,
  wins text,
  lessons text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, week_start)
);

CREATE TABLE IF NOT EXISTS public.monthly_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  month int NOT NULL CHECK (month BETWEEN 1 AND 12),
  year int NOT NULL,
  wins text,
  failures text,
  lessons text,
  goals_next_month text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, month, year)
);

CREATE TABLE IF NOT EXISTS public.deep_work_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id uuid,
  date date NOT NULL,
  duration_mins int NOT NULL,
  focus_rating int CHECK (focus_rating BETWEEN 1 AND 5),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.daily_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deep_work_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage daily_plans" ON public.daily_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage weekly_sprints" ON public.weekly_sprints FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage monthly_reviews" ON public.monthly_reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage deep_work_sessions" ON public.deep_work_sessions FOR ALL USING (auth.uid() = user_id);
