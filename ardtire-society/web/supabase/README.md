# Supabase setup (Phase 1)

## 1) Apply migrations
Run these SQL files in order using the Supabase SQL editor:

1. `web/supabase/migrations/001_init.sql`
2. `web/supabase/migrations/002_policies.sql`
3. `web/supabase/migrations/003_functions.sql`

## 2) Storage bucket
Create a bucket named `documents` (private recommended).

### Example Storage policies (member-only)
```sql
create policy "documents read"
on storage.objects
for select to authenticated
using (bucket_id = 'documents');

create policy "documents insert"
on storage.objects
for insert to authenticated
with check (bucket_id = 'documents');

create policy "documents update"
on storage.objects
for update to authenticated
using (bucket_id = 'documents')
with check (bucket_id = 'documents');
```

If you need stricter access by role, use a dedicated upload RPC (Phase 2).
