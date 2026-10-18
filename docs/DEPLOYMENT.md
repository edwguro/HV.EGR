# Verificación de despliegues en Railway

La web y la API se despliegan desde `main` como servicios independientes. Un push exitoso confirma la entrega a GitHub, no la publicación en Railway.

## Dependencias Docker

Los dos Dockerfiles copian los manifiestos del monorepo antes de instalar dependencias y reutilizan la caché normal de capas. No usan un montaje `type=cache`: Railway exige un identificador ligado a cada servicio y rechaza identificadores genéricos. Así se conserva el mismo Dockerfile para Docker local y Railway sin incorporar IDs del entorno.

Referencia: [Dockerfiles y cache mounts en Railway](https://docs.railway.com/builds/dockerfiles#cache-mounts).

## Comprobación después de publicar

1. Confirmar que `origin/main` contiene el commit esperado.
2. Revisar los estados de Railway para **HV.EGR** (web) y **glistening-integrity** (API). Ambos deben terminar correctamente; un despliegue fallido conserva la versión anterior.
3. Comprobar la respuesta de `/api/v1/health` en la API y abrir la web con una consulta nueva, por ejemplo `?deployment-check=<commit>`.
4. Verificar el cambio visible solicitado y el contenido de `/api/v1/profile` si se modificó la experiencia. Cambiar `prisma/data/resume.ts` no actualiza por sí solo PostgreSQL: publicar también una migración de datos acotada para los registros existentes.
5. Para cambios de marca, comprobar `/icon.svg` y la navegación en temas claro y oscuro. El navegador puede conservar el favicon después de actualizar la página.

No cambiar variables, reiniciar PostgreSQL ni borrar volúmenes para resolver un fallo de compilación. Consultar primero los logs del despliegue fallido.

## Actualizaciones de contenido en producción

El pre-despliegue de la API debe ejecutar únicamente `npx prisma migrate deploy`. No encadenar la semilla completa: `seed.ts` elimina y recrea experiencias, educación y habilidades, y no corresponde a una actualización puntual de una HV existente. La semilla queda reservada para inicializar una base nueva de forma explícita. En el despliegue anterior solo se observó la ejecución de migraciones; no asumir que un comando encadenado con `&&` ejecutó la sincronización.

La migración `20261018000000_update_ejercito_experience` publica el cargo y la descripción aprobados en `resume.ts`. Filtra por perfil, empresa, fechas y texto anterior; conserva ID, certificados, orden, demás experiencias y educación. Si no existe el registro anterior, no crea ni elimina datos. En una base nueva la semilla ya contiene el texto actualizado.

Prueba de regresión sobre PostgreSQL con el esquema migrado (usa exclusivamente tablas temporales y termina con rollback):

```sh
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f prisma/tests/ejercito-experience.sql
```

Después del despliegue, comprobar en los logs que se aplicó esa migración y que la API y la web muestran `Operaciones Especiales` con la descripción nueva, sin duplicar experiencias. Para revertir el contenido, crear una migración nueva con los valores anteriores del historial Git y los mismos filtros; no editar ni revertir manualmente una migración ya aplicada.
