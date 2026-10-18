-- Fallback store for contact form leads, written only by /api/contact with the service role key.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 254),
  service text not null,
  message text not null check (char_length(message) between 20 and 4000),
  budget text,
  timeline text,
  company text check (company is null or char_length(company) <= 200),
  source text,
  page text,
  country text,
  user_agent text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS on with no policies: anon and authenticated roles can neither read nor write.
-- The service role bypasses RLS, so only the server route can insert.
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
