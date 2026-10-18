-- Publish the HV.EGR project without reseeding or replacing other data.
-- The project is keyed by slug and never overwritten if it already exists, so
-- later manual edits are preserved. Safe to run more than once.
INSERT INTO "Project" (
    "id",
    "slug",
    "title",
    "summary",
    "description",
    "category",
    "demoUrl",
    "repositoryUrl",
    "screenshots",
    "featured",
    "published",
    "sortOrder",
    "updatedAt"
)
VALUES (
    gen_random_uuid(),
    'portafolio-full-stack',
    'Portafolio full-stack',
    'Hoja de vida digital construida como producto: interfaz accesible, API REST versionada, PostgreSQL, documentación OpenAPI, pruebas automatizadas y despliegue con contenedores.',
    'Monolito modular en un monorepo con Next.js en el frontend y NestJS en el backend, contratos TypeScript compartidos, persistencia con Prisma y PostgreSQL, integraciones con GitHub, OpenAI y correo ejecutadas solo en el servidor, y un asistente que responde únicamente con información publicada. Incluye pruebas unitarias y E2E, integración continua con GitHub Actions, Docker multi-stage y despliegue en Railway.',
    'Portafolio full-stack',
    'https://hv-egr.up.railway.app/',
    'https://github.com/edwguro/HV.EGR',
    ARRAY['/images/projects/hv-egr-showcase.png'],
    true,
    true,
    3,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "ProjectTechnology" ("id", "projectId", "name", "sortOrder", "updatedAt")
SELECT
    gen_random_uuid(),
    project."id",
    technology."name",
    technology."sortOrder",
    CURRENT_TIMESTAMP
FROM "Project" AS project
CROSS JOIN (
    VALUES
        ('TypeScript', 0),
        ('Next.js', 1),
        ('NestJS', 2),
        ('PostgreSQL', 3),
        ('Prisma', 4),
        ('Docker', 5),
        ('Railway', 6)
) AS technology ("name", "sortOrder")
WHERE project."slug" = 'portafolio-full-stack'
ON CONFLICT ("projectId", "name") DO NOTHING;

-- Make room for the new project as third in the list. Only rows still at their
-- previous position are moved, so a manual reordering is never overwritten.
UPDATE "Project"
SET
    "sortOrder" = "sortOrder" + 1,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE ("slug", "sortOrder") IN (
    ('taxi-ji', 3),
    ('territorio-360', 4),
    ('edufree-api', 5),
    ('ganaderia-app', 6)
);
