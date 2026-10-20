\set ON_ERROR_STOP on
BEGIN;
-- Minimal isolated fixture: never updates the real project table.
CREATE TEMP TABLE "Project" (
  "slug" text PRIMARY KEY,
  "repositoryUrl" text,
  "updatedAt" timestamptz DEFAULT '2026-01-01'
);
INSERT INTO "Project" ("slug", "repositoryUrl")
VALUES ('pautas-ji', NULL), ('other-project', NULL);
\ir ../migrations/20261019000000_add_pautas_ji_repository/migration.sql
DO $$
BEGIN
  IF (SELECT "repositoryUrl" FROM "Project" WHERE "slug" = 'pautas-ji')
     IS DISTINCT FROM 'https://github.com/edwguro/pautas-ji' THEN
    RAISE EXCEPTION 'Repository not assigned';
  END IF;
  IF EXISTS (SELECT 1 FROM "Project" WHERE "slug" = 'other-project'
             AND ("repositoryUrl" IS NOT NULL OR "updatedAt" <> '2026-01-01')) THEN
    RAISE EXCEPTION 'Unrelated project changed';
  END IF;
END $$;
CREATE TEMP TABLE after_update AS SELECT * FROM "Project";
\ir ../migrations/20261019000000_add_pautas_ji_repository/migration.sql
DO $$
BEGIN
  IF EXISTS (SELECT * FROM "Project" EXCEPT SELECT * FROM after_update) THEN
    RAISE EXCEPTION 'Migration is not idempotent';
  END IF;
END $$;
UPDATE "Project" SET "repositoryUrl" = 'https://github.com/example/manual-edit'
WHERE "slug" = 'pautas-ji';
\ir ../migrations/20261019000000_add_pautas_ji_repository/migration.sql
DO $$
BEGIN
  IF (SELECT "repositoryUrl" FROM "Project" WHERE "slug" = 'pautas-ji')
     IS DISTINCT FROM 'https://github.com/example/manual-edit' THEN
    RAISE EXCEPTION 'Manual edit overwritten';
  END IF;
END $$;
ROLLBACK;
\echo 'PASS: GitHub link, isolation, idempotence and manual edits'
