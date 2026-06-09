create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.assessment_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  newsletter_opt_in boolean not null default false,
  consent_timestamp timestamptz,
  source text not null default 'assessment',
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  first_name text,
  last_name text,
  email text not null unique,
  source text not null,
  newsletter_opt_in boolean not null default true,
  consent_timestamp timestamptz not null,
  signup_date timestamptz not null default now(),
  unsubscribed boolean not null default false,
  unsubscribed_at timestamptz,
  provider_sync jsonb not null default '{"provider":null,"status":"not_configured","lastAttemptAt":null}'::jsonb
);

create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.assessment_leads(id) on delete cascade,
  answers jsonb not null,
  result jsonb not null,
  completed_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.assessment_leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.assessment_responses enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

create or replace function public.create_assessment_lead(
  p_first_name text,
  p_last_name text,
  p_email text,
  p_newsletter_opt_in boolean default false,
  p_consent_timestamp timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead_id uuid;
begin
  insert into public.assessment_leads (
    first_name,
    last_name,
    email,
    newsletter_opt_in,
    consent_timestamp,
    source
  )
  values (
    trim(p_first_name),
    trim(p_last_name),
    lower(trim(p_email)),
    coalesce(p_newsletter_opt_in, false),
    case when coalesce(p_newsletter_opt_in, false) then p_consent_timestamp else null end,
    'assessment'
  )
  returning id into v_lead_id;

  if coalesce(p_newsletter_opt_in, false) then
    insert into public.newsletter_subscribers (
      name,
      first_name,
      last_name,
      email,
      source,
      newsletter_opt_in,
      consent_timestamp,
      unsubscribed,
      unsubscribed_at
    )
    values (
      concat_ws(' ', trim(p_first_name), trim(p_last_name)),
      trim(p_first_name),
      trim(p_last_name),
      lower(trim(p_email)),
      'assessment',
      true,
      coalesce(p_consent_timestamp, now()),
      false,
      null
    )
    on conflict (email) do update set
      name = excluded.name,
      first_name = excluded.first_name,
      last_name = excluded.last_name,
      source = excluded.source,
      newsletter_opt_in = true,
      consent_timestamp = excluded.consent_timestamp,
      unsubscribed = false,
      unsubscribed_at = null;
  end if;

  return v_lead_id;
end;
$$;

create or replace function public.complete_assessment(
  p_lead_id uuid,
  p_answers jsonb,
  p_result jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_response_id uuid;
begin
  insert into public.assessment_responses (lead_id, answers, result)
  values (p_lead_id, p_answers, p_result)
  returning id into v_response_id;

  return v_response_id;
end;
$$;

create or replace function public.subscribe_newsletter(
  p_first_name text,
  p_last_name text,
  p_email text,
  p_source text default 'blog',
  p_consent_timestamp timestamptz default now()
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_subscriber_id uuid;
begin
  insert into public.newsletter_subscribers (
    name,
    first_name,
    last_name,
    email,
    source,
    newsletter_opt_in,
    consent_timestamp,
    unsubscribed,
    unsubscribed_at
  )
  values (
    concat_ws(' ', trim(p_first_name), trim(p_last_name)),
    trim(p_first_name),
    trim(p_last_name),
    lower(trim(p_email)),
    coalesce(nullif(trim(p_source), ''), 'blog'),
    true,
    coalesce(p_consent_timestamp, now()),
    false,
    null
  )
  on conflict (email) do update set
    name = excluded.name,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    source = excluded.source,
    newsletter_opt_in = true,
    consent_timestamp = excluded.consent_timestamp,
    unsubscribed = false,
    unsubscribed_at = null
  returning id into v_subscriber_id;

  return v_subscriber_id;
end;
$$;

drop policy if exists "Admins can read admin users" on public.admin_users;
drop policy if exists "Admins can read assessment leads" on public.assessment_leads;
drop policy if exists "Admins can read assessment responses" on public.assessment_responses;
drop policy if exists "Admins can read newsletter subscribers" on public.newsletter_subscribers;
drop policy if exists "Admins can update newsletter subscribers" on public.newsletter_subscribers;

create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

create policy "Admins can read assessment leads"
on public.assessment_leads
for select
to authenticated
using (public.is_admin());

create policy "Admins can read assessment responses"
on public.assessment_responses
for select
to authenticated
using (public.is_admin());

create policy "Admins can read newsletter subscribers"
on public.newsletter_subscribers
for select
to authenticated
using (public.is_admin());

create policy "Admins can update newsletter subscribers"
on public.newsletter_subscribers
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant usage on schema public to anon, authenticated;
revoke all on public.admin_users from anon, authenticated;
revoke all on public.assessment_leads from anon, authenticated;
revoke all on public.assessment_responses from anon, authenticated;
revoke all on public.newsletter_subscribers from anon, authenticated;
revoke execute on function public.is_admin() from public;
revoke execute on function public.create_assessment_lead(text, text, text, boolean, timestamptz) from public;
revoke execute on function public.complete_assessment(uuid, jsonb, jsonb) from public;
revoke execute on function public.subscribe_newsletter(text, text, text, text, timestamptz) from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.create_assessment_lead(text, text, text, boolean, timestamptz) to anon, authenticated;
grant execute on function public.complete_assessment(uuid, jsonb, jsonb) to anon, authenticated;
grant execute on function public.subscribe_newsletter(text, text, text, text, timestamptz) to anon, authenticated;
grant select on public.admin_users to authenticated;
grant select on public.assessment_leads to authenticated;
grant select on public.assessment_responses to authenticated;
grant select, update on public.newsletter_subscribers to authenticated;

-- After creating the first Supabase Auth user for the site admin, run:
-- insert into public.admin_users (user_id, email)
-- values ('00000000-0000-0000-0000-000000000000', 'admin@example.com');
