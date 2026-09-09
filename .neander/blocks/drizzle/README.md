# Drizzle + managed Neon, version 1

Add only when persistence is requested. `pnpm add drizzle-orm@0.45.2 pg@8.23.0 @next/env@16.3.4`; `pnpm add -D drizzle-kit@0.31.10 @types/pg@8.23.1`.

Copy this block's `.example` files to their shown paths relative to the project root, removing only the `.example` suffix. Create parent directories. Merge files if the app already has those paths; never replace user code. The sample `/api/todos` is intentionally public until authentication is added; do not use it for private records.

Attach the development database from Neander and use its gitignored `.env.local` `DATABASE_URL`. Add the required provisioned Neon `DATABASE_URL` entry to `x-neander.environment` for production. No production credential belongs in local `.env.local`.

The block includes the first additive migration and its Drizzle history. After adding schema changes, generate an additive migration with `pnpm exec drizzle-kit generate`, inspect its SQL, and commit the generated `drizzle/` directory. If pnpm requests build approval for Drizzle Kit, approve only `esbuild` with `pnpm approve-builds esbuild` and commit the resulting `pnpm-workspace.yaml`. Change the Dockerfile dependency-layer COPY to `COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./` so frozen production installs use the same narrow approval. Apply development migrations explicitly with `node --env-file=.env.local .neander/migrate.mjs`. The same fixed command without `--env-file` is for the isolated production migration action with only its database credential. Never run it during Docker build or application startup. The script uses Drizzle history and a PostgreSQL advisory lock; a concurrent migration fails instead of racing. Do not use `drizzle-kit push` on managed production.

Verify `pnpm build` without `DATABASE_URL`; then run with the development URI. POST `/api/todos` with `{"title":"Persist me"}`, PATCH its `id` with `{"done":true}`, restart the app and GET to verify persistence, then DELETE `?id=<id>`. Invalid titles/IDs must return 400. Follow [Drizzle PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql) and [versioned migrations](https://orm.drizzle.team/docs/migrations).

Declare `migration: nextjs-drizzle` directly under `x-neander` when the migration files are present. Publish then runs that fixed profile in the isolated database-only migration step before application rollout. Do not add arbitrary shell commands to Compose.
