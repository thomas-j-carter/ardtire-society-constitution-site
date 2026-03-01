alter table public.profiles enable row level security;
alter table public.proposals enable row level security;
alter table public.proposal_votes enable row level security;
alter table public.documents enable row level security;
alter table public.document_versions enable row level security;
alter table public.audit_log enable row level security;

create or replace function public.current_role()
returns member_role
language sql stable
as $$
  select coalesce((select role from public.profiles where user_id = auth.uid()), 'observer'::member_role)
$$;

create or replace function public.is_adminish()
returns boolean
language sql stable
as $$
  select public.current_role() in ('founder','admin')
$$;

-- profiles
drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own"
on public.profiles for select to authenticated
using (user_id = auth.uid() or public.is_adminish());

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
on public.profiles for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- proposals
drop policy if exists "proposals select authed" on public.proposals;
create policy "proposals select authed"
on public.proposals for select to authenticated
using (true);

drop policy if exists "proposals insert member+" on public.proposals;
create policy "proposals insert member+"
on public.proposals for insert to authenticated
with check (public.current_role() in ('founder','admin','member') and created_by = auth.uid());

drop policy if exists "proposals update own draft or admin" on public.proposals;
create policy "proposals update own draft or admin"
on public.proposals for update to authenticated
using (public.is_adminish() or (created_by = auth.uid() and status = 'draft'))
with check (public.is_adminish() or (created_by = auth.uid() and status in ('draft','withdrawn')));

-- votes: select allowed, inserts via RPC only
drop policy if exists "votes select authed" on public.proposal_votes;
create policy "votes select authed"
on public.proposal_votes for select to authenticated
using (true);

drop policy if exists "votes no direct insert" on public.proposal_votes;
create policy "votes no direct insert"
on public.proposal_votes for insert to authenticated
with check (false);

drop policy if exists "votes no direct update" on public.proposal_votes;
create policy "votes no direct update"
on public.proposal_votes for update to authenticated
using (false);

-- documents
drop policy if exists "documents select by visibility" on public.documents;
create policy "documents select by visibility"
on public.documents for select to authenticated
using (
  visibility = 'public'
  or visibility = 'members'
  or (visibility = 'admins' and public.is_adminish())
);

drop policy if exists "documents insert member+" on public.documents;
create policy "documents insert member+"
on public.documents for insert to authenticated
with check (public.current_role() in ('founder','admin','member'));

drop policy if exists "documents update creator or admin" on public.documents;
create policy "documents update creator or admin"
on public.documents for update to authenticated
using (public.is_adminish() or created_by = auth.uid())
with check (public.is_adminish() or created_by = auth.uid());

-- document versions: select tied to document; inserts via RPC only
drop policy if exists "doc_versions select by document" on public.document_versions;
create policy "doc_versions select by document"
on public.document_versions for select to authenticated
using (
  exists (
    select 1 from public.documents d
    where d.id = document_versions.document_id
      and (
        d.visibility = 'public'
        or d.visibility = 'members'
        or (d.visibility = 'admins' and public.is_adminish())
      )
  )
);

drop policy if exists "doc_versions no direct insert" on public.document_versions;
create policy "doc_versions no direct insert"
on public.document_versions for insert to authenticated
with check (false);

-- audit log: adminish only, inserts via RPC only
drop policy if exists "audit select adminish" on public.audit_log;
create policy "audit select adminish"
on public.audit_log for select to authenticated
using (public.is_adminish());

drop policy if exists "audit no direct insert" on public.audit_log;
create policy "audit no direct insert"
on public.audit_log for insert to authenticated
with check (false);
