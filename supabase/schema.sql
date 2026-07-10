-- =========================================================
-- JENN Programme Intelligence System MVP Schema
-- Run this in a NEW Supabase project, not in LearnSphere.
-- =========================================================

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'jenn',
  contact_person text,
  contact_email text,
  contact_phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'viewer',
  institution_id uuid references public.institutions(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('admin', 'facilitator', 'viewer'))
);

create table if not exists public.programmes (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid references public.institutions(id) on delete cascade,
  name text not null,
  grade integer not null default 12,
  term integer,
  start_date date not null,
  end_date date not null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint programmes_status_check check (status in ('draft', 'active', 'completed', 'archived'))
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade integer not null default 12,
  created_at timestamptz not null default now(),
  unique(name, grade)
);

create table if not exists public.learners (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  id_number text,
  phone text,
  school_name text,
  grade integer not null default 12,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learner_registrations (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid references public.learners(id) on delete cascade,
  programme_id uuid references public.programmes(id) on delete cascade,
  registration_status text not null default 'registered',
  registered_at timestamptz not null default now(),
  unique(learner_id, programme_id),
  constraint learner_registrations_status_check check (registration_status in ('registered', 'withdrawn', 'completed'))
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid references public.programmes(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete restrict,
  facilitator_id uuid references public.profiles(id) on delete set null,
  session_date date not null,
  start_time time,
  end_time time,
  topic text not null,
  venue text,
  session_number integer,
  status text not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sessions_status_check check (status in ('scheduled', 'in_progress', 'completed', 'cancelled'))
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  learner_id uuid references public.learners(id) on delete cascade,
  status text not null default 'present',
  captured_by uuid references public.profiles(id) on delete set null,
  captured_at timestamptz not null default now(),
  notes text,
  unique(session_id, learner_id),
  constraint attendance_status_check check (status in ('present', 'absent', 'late', 'excused'))
);

create table if not exists public.session_notes (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  captured_by uuid references public.profiles(id) on delete set null,
  topic_covered text not null,
  summary text,
  learner_challenges text,
  recommended_follow_up text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(session_id)
);

create table if not exists public.report_snapshots (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid references public.programmes(id) on delete cascade,
  title text not null,
  report_type text not null default 'department_summary',
  data jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists set_programmes_updated_at on public.programmes;
create trigger set_programmes_updated_at before update on public.programmes for each row execute function public.set_updated_at();

drop trigger if exists set_learners_updated_at on public.learners;
create trigger set_learners_updated_at before update on public.learners for each row execute function public.set_updated_at();

drop trigger if exists set_sessions_updated_at on public.sessions;
create trigger set_sessions_updated_at before update on public.sessions for each row execute function public.set_updated_at();

drop trigger if exists set_session_notes_updated_at on public.session_notes;
create trigger set_session_notes_updated_at before update on public.session_notes for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    'viewer'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'viewer');
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() = 'admin';
$$;

create or replace function public.can_manage_programme_data()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() in ('admin', 'facilitator');
$$;

alter table public.institutions enable row level security;
alter table public.profiles enable row level security;
alter table public.programmes enable row level security;
alter table public.subjects enable row level security;
alter table public.learners enable row level security;
alter table public.learner_registrations enable row level security;
alter table public.sessions enable row level security;
alter table public.attendance enable row level security;
alter table public.session_notes enable row level security;
alter table public.report_snapshots enable row level security;

drop policy if exists "authenticated can read institutions" on public.institutions;
drop policy if exists "admins manage institutions" on public.institutions;
drop policy if exists "authenticated can read profiles" on public.profiles;
drop policy if exists "users can update own profile" on public.profiles;
drop policy if exists "admins manage profiles" on public.profiles;
drop policy if exists "authenticated can read programmes" on public.programmes;
drop policy if exists "managers can manage programmes" on public.programmes;
drop policy if exists "authenticated can read subjects" on public.subjects;
drop policy if exists "managers can manage subjects" on public.subjects;
drop policy if exists "authenticated can read learners" on public.learners;
drop policy if exists "managers can manage learners" on public.learners;
drop policy if exists "authenticated can read learner registrations" on public.learner_registrations;
drop policy if exists "managers can manage learner registrations" on public.learner_registrations;
drop policy if exists "authenticated can read sessions" on public.sessions;
drop policy if exists "managers can manage sessions" on public.sessions;
drop policy if exists "authenticated can read attendance" on public.attendance;
drop policy if exists "managers can manage attendance" on public.attendance;
drop policy if exists "authenticated can read session notes" on public.session_notes;
drop policy if exists "managers can manage session notes" on public.session_notes;
drop policy if exists "authenticated can read report snapshots" on public.report_snapshots;
drop policy if exists "managers can manage report snapshots" on public.report_snapshots;

create policy "authenticated can read institutions" on public.institutions for select to authenticated using (true);
create policy "admins manage institutions" on public.institutions for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "authenticated can read profiles" on public.profiles for select to authenticated using (true);
create policy "users can update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "authenticated can read programmes" on public.programmes for select to authenticated using (true);
create policy "managers can manage programmes" on public.programmes for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create policy "authenticated can read subjects" on public.subjects for select to authenticated using (true);
create policy "managers can manage subjects" on public.subjects for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create policy "authenticated can read learners" on public.learners for select to authenticated using (true);
create policy "managers can manage learners" on public.learners for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create policy "authenticated can read learner registrations" on public.learner_registrations for select to authenticated using (true);
create policy "managers can manage learner registrations" on public.learner_registrations for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create policy "authenticated can read sessions" on public.sessions for select to authenticated using (true);
create policy "managers can manage sessions" on public.sessions for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create policy "authenticated can read attendance" on public.attendance for select to authenticated using (true);
create policy "managers can manage attendance" on public.attendance for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create policy "authenticated can read session notes" on public.session_notes for select to authenticated using (true);
create policy "managers can manage session notes" on public.session_notes for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create policy "authenticated can read report snapshots" on public.report_snapshots for select to authenticated using (true);
create policy "managers can manage report snapshots" on public.report_snapshots for all to authenticated using (public.can_manage_programme_data()) with check (public.can_manage_programme_data());

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_programmes_institution_id on public.programmes(institution_id);
create index if not exists idx_programmes_status on public.programmes(status);
create index if not exists idx_learners_school_name on public.learners(school_name);
create index if not exists idx_learner_registrations_programme_id on public.learner_registrations(programme_id);
create index if not exists idx_sessions_programme_id on public.sessions(programme_id);
create index if not exists idx_sessions_subject_id on public.sessions(subject_id);
create index if not exists idx_sessions_session_date on public.sessions(session_date);
create index if not exists idx_attendance_session_id on public.attendance(session_id);
create index if not exists idx_attendance_learner_id on public.attendance(learner_id);
create index if not exists idx_attendance_status on public.attendance(status);

create or replace view public.programme_report_summary as
select
  p.id as programme_id,
  p.name as programme_name,
  p.grade,
  p.term,
  p.start_date,
  p.end_date,
  p.status,
  count(distinct lr.learner_id) as registered_learners,
  count(distinct s.id) as total_sessions,
  count(distinct s.id) filter (where s.status = 'completed') as completed_sessions,
  count(a.id) as attendance_records,
  count(a.id) filter (where a.status = 'present') as present_count,
  count(a.id) filter (where a.status = 'absent') as absent_count,
  count(a.id) filter (where a.status = 'late') as late_count,
  case
    when count(a.id) = 0 then 0
    else round((count(a.id) filter (where a.status = 'present')::numeric / count(a.id)::numeric) * 100, 1)
  end as attendance_rate
from public.programmes p
left join public.learner_registrations lr on lr.programme_id = p.id
left join public.sessions s on s.programme_id = p.id
left join public.attendance a on a.session_id = s.id
group by p.id;

create or replace view public.attendance_by_subject as
select
  p.id as programme_id,
  sub.name as subject_name,
  count(distinct s.id) as sessions_count,
  count(a.id) as attendance_records,
  count(a.id) filter (where a.status = 'present') as present_count,
  count(a.id) filter (where a.status = 'absent') as absent_count,
  case
    when count(a.id) = 0 then 0
    else round((count(a.id) filter (where a.status = 'present')::numeric / count(a.id)::numeric) * 100, 1)
  end as attendance_rate
from public.programmes p
join public.sessions s on s.programme_id = p.id
join public.subjects sub on sub.id = s.subject_id
left join public.attendance a on a.session_id = s.id
group by p.id, sub.name;

create or replace view public.attendance_by_school as
select
  p.id as programme_id,
  coalesce(l.school_name, 'Unknown school') as school_name,
  count(distinct l.id) as learners_count,
  count(a.id) as attendance_records,
  count(a.id) filter (where a.status = 'present') as present_count,
  count(a.id) filter (where a.status = 'absent') as absent_count,
  case
    when count(a.id) = 0 then 0
    else round((count(a.id) filter (where a.status = 'present')::numeric / count(a.id)::numeric) * 100, 1)
  end as attendance_rate
from public.programmes p
join public.learner_registrations lr on lr.programme_id = p.id
join public.learners l on l.id = lr.learner_id
left join public.sessions s on s.programme_id = p.id
left join public.attendance a on a.session_id = s.id and a.learner_id = l.id
group by p.id, coalesce(l.school_name, 'Unknown school');

insert into public.institutions (name, type, contact_person)
values ('JENN', 'jenn', 'Programme Coordinator')
on conflict do nothing;

insert into public.subjects (name, grade)
values
  ('Accounting', 12),
  ('Agricultural Sciences', 12),
  ('Business Studies', 12),
  ('Computer Applications Technology', 12),
  ('Economics', 12),
  ('English HL', 12),
  ('English FAL', 12),
  ('Geography', 12),
  ('History', 12),
  ('IsiXhosa HL', 12),
  ('IsiXhosa FAL', 12),
  ('Life Sciences', 12),
  ('Mathematical Literacy', 12),
  ('Mathematics', 12),
  ('Physical Sciences', 12),
  ('Tourism', 12)
on conflict (name, grade) do nothing;
