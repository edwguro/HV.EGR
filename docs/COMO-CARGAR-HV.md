# Cómo ingresar los datos de la hoja de vida

La información principal está centralizada en:

```text
prisma/data/resume.ts
```

## 1. Perfil

Edita el objeto `profile` con el nombre, título profesional, resumen, ciudad, correo y enlaces. Usa `null` cuando todavía no tengas un dato, en lugar de inventarlo.

## 2. Experiencia

Dentro de `experiences`, copia el bloque comentado y completa un objeto por cada cargo. Ordena los cargos desde el más reciente hasta el más antiguo.

Las fechas deben usar el formato `AAAA-MM-DD`. Si el cargo es actual, omite `endDate` y usa `isCurrent: true`.

## 3. Educación

Dentro de `education`, copia el bloque comentado y completa un objeto por cada estudio relevante. Incluye universidad, formación técnica o cursos que puedas verificar.

## 4. Certificados y soportes

Cada experiencia y estudio admite un enlace público opcional:

```ts
certificateUrl: 'https://enlace-publico-al-certificado-o-diploma',
```

Cuando el enlace exista aparecerá el botón **Ver certificación** en la tarjeta correspondiente. No uses una ruta privada del computador; utiliza un enlace público de Google Drive, OneDrive, LinkedIn u otra fuente verificable.

## 5. Aplicar los cambios

Desde la terminal de VS Code, en la raíz del proyecto:

```powershell
corepack pnpm db:seed
```

La página en desarrollo actualizará los datos desde PostgreSQL. Comprueba el resultado en:

```text
http://localhost:3000
```

## Recomendaciones de contenido

- Describe resultados concretos, no solo funciones.
- Evita porcentajes o cifras que no puedas demostrar.
- Menciona tecnologías realmente utilizadas.
- No publiques documentos de identidad, direcciones completas ni datos privados.
- Mantén cada descripción entre dos y cuatro frases breves.
