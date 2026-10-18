\set ON_ERROR_STOP on
BEGIN;

-- Temporary tables shadow the real tables. No persistent data is modified.
CREATE TEMP TABLE "Profile" (LIKE public."Profile" INCLUDING DEFAULTS);
CREATE TEMP TABLE "Experience" (LIKE public."Experience" INCLUDING DEFAULTS);

INSERT INTO "Profile" ("id", "slug", "fullName", "headline", "professionalSummary", "updatedAt")
VALUES
    ('11111111-1111-4111-8111-111111111111', 'professional-profile', 'Test', 'Test', 'Test', CURRENT_TIMESTAMP),
    ('22222222-2222-4222-8222-222222222222', 'another-profile', 'Test', 'Test', 'Test', CURRENT_TIMESTAMP);

INSERT INTO "Experience" ("id", "profileId", "company", "role", "description", "location", "startDate", "endDate", "certificateUrl", "sortOrder", "updatedAt")
VALUES ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 'Ejército Nacional de Colombia', 'SLP-Operaciones Especiales', 'Operaciones especiales antiterrorismo en todo el territorio nacional colombiano.', 'Territorio nacional', '1999-09-29', '2006-03-15', '/test-certificate.pdf', 5, '2026-01-01');

-- Controls: another profile, employer, period, and a newer manual edit.
INSERT INTO "Experience" ("id", "profileId", "company", "role", "description", "startDate", "endDate", "updatedAt")
SELECT fixture.id::uuid, fixture.profile_id::uuid, fixture.company, original."role", fixture.description, fixture.start_date::date, original."endDate", original."updatedAt"
FROM "Experience" original
CROSS JOIN (VALUES
    ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '22222222-2222-4222-8222-222222222222', 'Ejército Nacional de Colombia', '1999-09-29', 'Operaciones especiales antiterrorismo en todo el territorio nacional colombiano.'),
    ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', '11111111-1111-4111-8111-111111111111', 'Otra empresa', '1999-09-29', 'Operaciones especiales antiterrorismo en todo el territorio nacional colombiano.'),
    ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', '11111111-1111-4111-8111-111111111111', 'Ejército Nacional de Colombia', '2000-01-01', 'Operaciones especiales antiterrorismo en todo el territorio nacional colombiano.'),
    ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', '11111111-1111-4111-8111-111111111111', 'Ejército Nacional de Colombia', '1999-09-29', 'Edición posterior que debe conservarse.')
) AS fixture(id, profile_id, company, start_date, description);

CREATE TEMP TABLE before_experience AS SELECT * FROM "Experience";
\ir ../migrations/20261018000000_update_ejercito_experience/migration.sql

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM "Experience"
        WHERE "id" = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
          AND "role" = 'Operaciones Especiales'
          AND "description" = 'Realizar Operaciones especiales antiterrorismo en todo el territorio nacional colombiano en unidades de contraguerrilas y contraterrorismo.'
    ) THEN
        RAISE EXCEPTION 'The approved army text was not applied';
    END IF;

    IF (SELECT count(*) FROM "Experience") <> 5 OR EXISTS (
        SELECT 1 FROM "Experience" actual
        FULL JOIN before_experience original USING ("id")
        WHERE CASE WHEN actual."id" = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
            THEN (to_jsonb(actual) - ARRAY['role', 'description', 'updatedAt']) IS DISTINCT FROM
                 (to_jsonb(original) - ARRAY['role', 'description', 'updatedAt'])
            ELSE to_jsonb(actual) IS DISTINCT FROM to_jsonb(original)
        END
    ) THEN
        RAISE EXCEPTION 'Unrelated data changed or records were duplicated';
    END IF;
END $$;

CREATE TEMP TABLE after_experience AS SELECT * FROM "Experience";
\ir ../migrations/20261018000000_update_ejercito_experience/migration.sql

DO $$
BEGIN
    IF EXISTS (
        (SELECT * FROM "Experience" EXCEPT SELECT * FROM after_experience)
        UNION ALL
        (SELECT * FROM after_experience EXCEPT SELECT * FROM "Experience")
    ) THEN
        RAISE EXCEPTION 'The migration is not idempotent';
    END IF;
END $$;

ROLLBACK;
\echo 'PASS: approved text, preserved records/fields, and idempotence'
