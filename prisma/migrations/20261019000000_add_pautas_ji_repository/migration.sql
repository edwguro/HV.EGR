-- Enable the existing GitHub action without reseeding or overwriting manual edits.
UPDATE "Project"
SET "repositoryUrl" = 'https://github.com/edwguro/pautas-ji',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'pautas-ji'
  AND ("repositoryUrl" IS NULL OR btrim("repositoryUrl") = '');
