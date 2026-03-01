# Ardtire Society Constitution Site

This repository contains the **Ardtire Society Constitution Site** project.

## What is in this repo

The repository root currently contains planning/reference documents plus
the actual runnable application source.

* `README.md` — repository overview
* `development-log.md` — build notes / planning history
* `sitemap.md` — sitemap notes
* `ardtire-society/` — the actual application workspace

The app itself is a **pnpm monorepo** inside `ardtire-society/` with two packages:

* `web/` — Next.js public site and member-facing application
* `studio/` — Sanity Studio content workspace
* `seed/` — Sanity seed data and import notes

## Current stack

### Workspace

* **Package manager:** `pnpm@9.12.3`
* **Node requirement:** `>=20.11`
* **Pinned Node version:** `20.11.1`

### Web app (`ardtire-society/web`)

* **Next.js:** `^14.2.0`
* **React:** `^18.2.0`
* **TypeScript:** `^5.5.4`
* **Supabase client:** `@supabase/supabase-js ^2.45.1`
* **Sanity client:** `@sanity/client ^6.0.0`
* **Tailwind CSS:** `^3.4.17`
* **PostCSS:** `^8.4.47`

### Studio (`ardtire-society/studio`)

* **Sanity:** `^3.0.0`
* **@sanity/vision:** `^3.0.0`
* **styled-components:** `^6.3.11`
* **TypeScript:** `^5.5.4`

## Project structure

```text
.
├── README.md
├── development-log.md
├── sitemap.md
└── ardtire-society/
    ├── .node-version
    ├── package.json
    ├── pnpm-workspace.yaml
    ├── seed/
    │   ├── seed.ndjson
    │   └── SEEDING.md
    ├── studio/
    │   ├── .env.example
    │   ├── package.json
    │   ├── sanity.config.ts
    │   ├── sanity.cli.ts
    │   └── schemaTypes/
    └── web/
        ├── app/
        ├── components/
        ├── lib/
        ├── package.json
        ├── next.config.mjs
        ├── tailwind.config.ts
        ├── postcss.config.mjs
        ├── postcss.config.cjs
        └── supabase/
```

## What the app does

This project combines:

* a **public, CMS-driven site** for publishing official content
* a **Sanity Studio** for managing structured content
* a **Supabase-backed membership/governance layer** for:

  * profiles
  * roles
  * proposals
  * proposal voting
  * documents
  * document versioning
  * audit logging

## Prerequisites

Before running the project, install:

* **Node 20.11+**
* **pnpm**
* a **Sanity project** (project ID + dataset)
* a **Supabase project** (URL + anon key)

## Getting started

### 1) Enter the workspace

```bash
cd ardtire-society
```

### 2) Install dependencies

```bash
pnpm install
```

### 3) Configure environment variables

#### Studio

Copy the example file:

```bash
cp studio/.env.example studio/.env
```

Then set your real Sanity values in `studio/.env`.

#### Web

There is **currently no `web/.env.example` file** in the repo, so create `web/.env.local` manually.

Use these variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4) Run the apps in development

From `ardtire-society/`:

```bash
pnpm dev
```

This starts both packages concurrently:

* **Web:** `http://localhost:3000`
* **Studio:** `http://localhost:3333`

## Useful workspace commands

Run these from `ardtire-society/`:

```bash
pnpm dev
pnpm web:dev
pnpm studio:dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format
```

## Sanity seed data

Seed content is included in:

* `seed/seed.ndjson`

Import instructions are documented in:

* `seed/SEEDING.md`

Typical flow:

```bash
cd studio
pnpm sanity dataset create staging
pnpm sanity dataset import ../seed/seed.ndjson staging --replace
```

## Supabase setup

Supabase SQL files are included in:

* `web/supabase/migrations/001_init.sql`
* `web/supabase/migrations/002_policies.sql`
* `web/supabase/migrations/003_functions.sql`

Apply them in order using the Supabase SQL editor.

The project also expects a Storage bucket named:

* `documents`

Additional notes are in:

* `web/supabase/README.md`

## Notes

* The **actual runnable application is inside `ardtire-society/`**.
* The **web app environment file must currently be created manually** 
  until a `web/.env.example` is added.
* The `web/` package currently contains both `postcss.config.mjs`
  and `postcss.config.cjs`; standardizing that setup is a separate cleanup task.

## License
