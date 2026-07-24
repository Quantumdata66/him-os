-- 004_habits.sql
CREATE TABLE IF NOT EXISTS public.habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  icon text DEFAULT '🔥',
  color text DEFAULT '#C9A84C',
  category text NOT NULL,
  frequency text DEFAULT 'daily',
  archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.habit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id uuid REFERENCES public.habits(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(habit_id, date)
);

ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage habits" ON public.habits FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage habit_logs" ON public.habit_logs FOR ALL USING (auth.uid() = user_id);
