-- Remove the two education entries that never had a certificate and the
-- license number from the engineering degree description, without reseeding.
-- Rows are matched by profile, institution, degree and missing certificate, so
-- nothing else is touched. Safe to run more than once.
DELETE FROM "Education" AS education
USING "Profile" AS profile
WHERE education."profileId" = profile."id"
  AND profile."slug" = 'professional-profile'
  AND education."certificateUrl" IS NULL
  AND (
    (
      education."institution" = 'EDUTIN ACADEMY'
      AND education."degree" = 'Certificación en Node.js'
    )
    OR (
      education."institution" = 'CUN'
      AND education."degree" = 'Técnico Profesional en Soporte e Informática'
    )
  );

UPDATE "Education" AS education
SET
    "description" = 'Ingeniero de Sistemas · Tarjeta profesional COPNIA.',
    "updatedAt" = CURRENT_TIMESTAMP
FROM "Profile" AS profile
WHERE education."profileId" = profile."id"
  AND profile."slug" = 'professional-profile'
  AND education."institution" = 'CUN'
  AND education."degree" = 'Ingeniero de Sistemas'
  AND education."description" = 'Ingeniero de Sistemas · Tarjeta profesional No. 091122-0807632 CNDC COPNIA.';
