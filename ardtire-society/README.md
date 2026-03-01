# Ardtire Society — CMS-first Public Site + Phase 1 Membership

Monorepo:
- `web/` Next.js 14 (TypeScript) public CMS site + member area (Supabase)
- `studio/` Sanity Studio v3
- `seed/` Sanity seed content

## Requirements met
- Public informational pages are **CMS-first** (Sanity).
- Minimal hardcoded copy only for UI labels, 404, empty-states.
- Secular design, indigo accent.
- Supabase Auth + RLS + Storage + realtime voting updates.

## Prerequisites
- Node >= 20.11 (see `.node-version`)
- pnpm (recommended)
- Supabase project (Auth + Database + Storage)
- Sanity project (projectId + dataset)

## Install
```bash
pnpm install
```

## Environment
Copy env examples:
- `studio/.env.example` → `studio/.env`
- `web/.env.example` → `web/.env.local`

## Run
```bash
pnpm dev
```
- Web: http://localhost:3000
- Studio: http://localhost:3333

## Seed Sanity
See `seed/SEEDING.md`.

## Supabase
Run SQL migrations in Supabase SQL editor, in order:
- `web/supabase/migrations/001_init.sql`
- `web/supabase/migrations/002_policies.sql`
- `web/supabase/migrations/003_functions.sql`

Create Storage bucket `documents` (private recommended). See `web/supabase/README.md`.
