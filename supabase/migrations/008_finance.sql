-- 008_finance.sql
CREATE TABLE IF NOT EXISTS public.asset_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('brokerage','savings','crypto','real_estate','cash','retirement','other')),
  currency text DEFAULT 'NGN',
  institution text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.asset_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES public.asset_accounts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  balance numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(account_id, date)
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_id uuid REFERENCES public.asset_accounts(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('income','expense','transfer','investment')),
  amount numeric NOT NULL,
  category text,
  description text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.asset_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage asset_accounts" ON public.asset_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage asset_snapshots" ON public.asset_snapshots FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage transactions" ON public.transactions FOR ALL USING (auth.uid() = user_id);
