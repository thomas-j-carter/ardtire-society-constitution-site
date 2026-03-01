# Seeding Sanity

Seed data: `seed/seed.ndjson`

## Import into staging

```bash
cd studio
pnpm install
pnpm sanity dataset create staging
pnpm sanity dataset import ../seed/seed.ndjson staging --replace
```

## Import into production

```bash
pnpm sanity dataset import ../seed/seed.ndjson production --replace
```

Notes:
- `siteSettings` document ID is exactly `siteSettings`.
- Singleton pages use `_id = "sitePage.{section}.{key}"`.
