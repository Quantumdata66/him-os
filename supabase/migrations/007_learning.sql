-- 007_learning.sql
CREATE TABLE IF NOT EXISTS public.learning_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('book','course','video','paper','certification','exercise','flashcard_deck')),
  title text NOT NULL,
  author text,
  url text,
  status text DEFAULT 'planned' CHECK (status IN ('planned','in_progress','completed','abandoned')),
  pages_total int,
  pages_read int DEFAULT 0,
  rating int CHECK (rating BETWEEN 1 AND 5),
  started_at date,
  completed_at date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.learning_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_item_id uuid REFERENCES public.learning_items(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_md text NOT NULL,
  note_type text DEFAULT 'note' CHECK (note_type IN ('note','highlight','summary','question')),
  page_ref text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.learning_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage learning_items" ON public.learning_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage learning_notes" ON public.learning_notes FOR ALL USING (auth.uid() = user_id);
