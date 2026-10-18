-- Publish the approved resume edit without reseeding or replacing other data.
-- Match the previous text so later/manual edits are never overwritten.
UPDATE "Experience" AS experience
SET
    "role" = 'Operaciones Especiales',
    "description" = 'Realizar Operaciones especiales antiterrorismo en todo el territorio nacional colombiano en unidades de contraguerrilas y contraterrorismo.',
    "updatedAt" = CURRENT_TIMESTAMP
FROM "Profile" AS profile
WHERE experience."profileId" = profile."id"
  AND profile."slug" = 'professional-profile'
  AND experience."company" = 'Ejército Nacional de Colombia'
  AND experience."startDate" = DATE '1999-09-29'
  AND experience."endDate" = DATE '2006-03-15'
  AND experience."role" = 'SLP-Operaciones Especiales'
  AND experience."description" = 'Operaciones especiales antiterrorismo en todo el territorio nacional colombiano.';
