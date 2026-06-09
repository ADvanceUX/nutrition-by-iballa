alter table public.newsletter_subscribers
  add column if not exists first_name text,
  add column if not exists last_name text;

update public.newsletter_subscribers
set
  first_name = coalesce(first_name, nullif(split_part(trim(name), ' ', 1), '')),
  last_name = coalesce(
    last_name,
    nullif(trim(substr(trim(name), length(split_part(trim(name), ' ', 1)) + 1)), '')
  )
where first_name is null or last_name is null;

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

drop function if exists public.subscribe_newsletter(text, text, text, timestamptz);

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

revoke execute on function public.subscribe_newsletter(text, text, text, text, timestamptz) from public;
grant execute on function public.subscribe_newsletter(text, text, text, text, timestamptz) to anon, authenticated;
