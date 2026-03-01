create or replace function public.audit(action_text text, entity_type_text text, entity_id_value uuid, meta_value jsonb)
returns void
language plpgsql security definer
as $$
begin
  insert into public.audit_log(actor_id, action, entity_type, entity_id, meta)
  values (auth.uid(), action_text, entity_type_text, entity_id_value, coalesce(meta_value, '{}'::jsonb));
end $$;

create or replace function public.can_vote(proposal_id uuid)
returns boolean
language plpgsql stable
as $$
declare
  r member_role;
  st proposal_status;
  oa timestamptz;
  ca timestamptz;
begin
  r := public.current_role();
  if r not in ('founder','admin','member') then
    return false;
  end if;

  select status, opens_at, closes_at into st, oa, ca
  from public.proposals
  where id = proposal_id;

  if st is null then return false; end if;
  if st <> 'open' then return false; end if;

  if oa is not null and now() < oa then return false; end if;
  if ca is not null and now() > ca then return false; end if;

  return true;
end $$;

create or replace function public.cast_vote(proposal_id uuid, vote_value vote_value, reason_text text)
returns void
language plpgsql security definer
as $$
begin
  if not public.can_vote(proposal_id) then
    raise exception 'not allowed';
  end if;

  insert into public.proposal_votes(proposal_id, voter_id, vote, reason)
  values (proposal_id, auth.uid(), vote_value, reason_text)
  on conflict (proposal_id, voter_id)
  do update set vote = excluded.vote, reason = excluded.reason, updated_at = now();

  perform public.audit('cast_vote', 'proposal', proposal_id, jsonb_build_object('vote', vote_value));
end $$;

create or replace view public.proposal_vote_tallies as
select
  proposal_id,
  sum(case when vote='yes' then 1 else 0 end)::int as yes_count,
  sum(case when vote='no' then 1 else 0 end)::int as no_count,
  sum(case when vote='abstain' then 1 else 0 end)::int as abstain_count
from public.proposal_votes
group by proposal_id;

create or replace function public.create_document(title_text text, description_text text, visibility_value doc_visibility)
returns uuid
language plpgsql security definer
as $$
declare
  doc_id uuid;
  r member_role;
begin
  r := public.current_role();
  if r not in ('founder','admin','member') then
    raise exception 'not allowed';
  end if;

  if visibility_value = 'public' and r not in ('founder','admin') then
    raise exception 'not allowed';
  end if;

  insert into public.documents(title, description, visibility, created_by)
  values (title_text, description_text, visibility_value, auth.uid())
  returning id into doc_id;

  perform public.audit('create_document', 'document', doc_id, jsonb_build_object('visibility', visibility_value));
  return doc_id;
end $$;

create or replace function public.add_document_version(
  document_id_value uuid,
  file_name_value text,
  mime_type_value text,
  size_bytes_value bigint,
  sha256_value text,
  storage_bucket_value text,
  storage_path_value text
)
returns uuid
language plpgsql security definer
as $$
declare
  r member_role;
  v int;
  ver_id uuid;
  vis doc_visibility;
begin
  r := public.current_role();
  if r not in ('founder','admin','member') then
    raise exception 'not allowed';
  end if;

  select visibility into vis from public.documents where id = document_id_value;
  if vis is null then raise exception 'document not found'; end if;

  if vis = 'admins' and r not in ('founder','admin') then
    raise exception 'not allowed';
  end if;

  select coalesce(max(version),0)+1 into v from public.document_versions where document_id = document_id_value;

  insert into public.document_versions(document_id, version, storage_bucket, storage_path, file_name, mime_type, size_bytes, sha256, created_by)
  values (document_id_value, v, storage_bucket_value, storage_path_value, file_name_value, mime_type_value, size_bytes_value, sha256_value, auth.uid())
  returning id into ver_id;

  perform public.audit('add_document_version', 'document', document_id_value, jsonb_build_object('version', v));
  return ver_id;
end $$;

create or replace function public.admin_set_user_role(target_user_id uuid, new_role member_role)
returns void
language plpgsql security definer
as $$
declare
  r member_role;
begin
  r := public.current_role();
  if r not in ('founder','admin') then raise exception 'not allowed'; end if;

  update public.profiles set role = new_role, updated_at = now() where user_id = target_user_id;
  perform public.audit('set_role', 'profile', target_user_id, jsonb_build_object('role', new_role));
end $$;

grant execute on function public.cast_vote(uuid, vote_value, text) to authenticated;
grant execute on function public.create_document(text, text, doc_visibility) to authenticated;
grant execute on function public.add_document_version(uuid, text, text, bigint, text, text, text) to authenticated;
grant execute on function public.admin_set_user_role(uuid, member_role) to authenticated;
grant execute on function public.can_vote(uuid) to authenticated;
grant execute on function public.current_role() to authenticated;
