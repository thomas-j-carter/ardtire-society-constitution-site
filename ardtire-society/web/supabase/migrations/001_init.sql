create extension if not exists pgcrypto;

do $$ begin
  create type member_role as enum ('founder','admin','member','observer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_status as enum ('draft','open','closed','adopted','rejected','withdrawn');
exception when duplicate_object then null; end $$;

do $$ begin
  create type vote_value as enum ('yes','no','abstain');
exception when duplicate_object then null; end $$;

do $$ begin
  create type doc_visibility as enum ('public','members','admins');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role member_role not null default 'observer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles(user_id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name',''), 'observer')
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(user_id) on delete restrict,
  title text not null,
  summary text,
  body text,
  status proposal_status not null default 'draft',
  opens_at timestamptz,
  closes_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists proposals_status_created_at_idx on public.proposals(status, created_at desc);
create index if not exists proposals_created_by_idx on public.proposals(created_by);

drop trigger if exists proposals_set_updated_at on public.proposals;
create trigger proposals_set_updated_at before update on public.proposals
for each row execute function public.set_updated_at();

create table if not exists public.proposal_votes (
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  voter_id uuid not null references public.profiles(user_id) on delete cascade,
  vote vote_value not null,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (proposal_id, voter_id)
);

create index if not exists proposal_votes_proposal_idx on public.proposal_votes(proposal_id);

drop trigger if exists proposal_votes_set_updated_at on public.proposal_votes;
create trigger proposal_votes_set_updated_at before update on public.proposal_votes
for each row execute function public.set_updated_at();

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  visibility doc_visibility not null default 'members',
  created_by uuid not null references public.profiles(user_id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists documents_visibility_idx on public.documents(visibility);
create index if not exists documents_created_at_idx on public.documents(created_at desc);

drop trigger if exists documents_set_updated_at on public.documents;
create trigger documents_set_updated_at before update on public.documents
for each row execute function public.set_updated_at();

create table if not exists public.document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  version int not null,
  storage_bucket text not null,
  storage_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  sha256 text,
  created_by uuid not null references public.profiles(user_id) on delete restrict,
  created_at timestamptz not null default now(),
  unique (document_id, version)
);

create index if not exists document_versions_doc_idx on public.document_versions(document_id, version desc);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(user_id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_created_at_idx on public.audit_log(created_at desc);
create index if not exists audit_log_entity_idx on public.audit_log(entity_type, entity_id);
