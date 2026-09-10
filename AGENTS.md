# Project setup

Read `README.md` for runtime versions and existing development/check/build commands.
The bare starter needs no database, credentials or external services.
When persistence is requested, follow `.neander/blocks/drizzle/README.md` for dependencies, local PostgreSQL setup, migrations and CRUD/restart verification.
Copy the development Compose example to the root only when installing that block; preserve existing files and database data.
Keep local credentials in gitignored `.env.local`. Production uses the separate managed Neon recipe contract.
Report local database checks separately from managed Neon and production deployment proof.
