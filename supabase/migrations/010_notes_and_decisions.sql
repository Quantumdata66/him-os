-- 010_notes_and_decisions.sql
CREATE TABLE IF NOT EXISTS public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content_md text,
  type text DEFAULT 'note' CHECK (type IN ('idea','journal','meeting','tech','general')),
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  context text,
  decision text NOT NULL,
  reasoning text,
  assumptions text[],
  expected_outcome text,
  actual_outcome text,
  lessons text,
  decided_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage notes" ON public.notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage decisions" ON public.decisions FOR ALL USING (auth.uid() = user_id);
