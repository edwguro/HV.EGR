# Verificación de despliegues en Railway

La web y la API se despliegan desde `main` como servicios independientes. Un push exitoso confirma la entrega a GitHub, no la publicación en Railway.

## Dependencias Docker

Los dos Dockerfiles copian los manifiestos del monorepo antes de instalar dependencias y reutilizan la caché normal de capas. No usan un montaje `type=cache`: Railway exige un identificador ligado a cada servicio y rechaza identificadores genéricos. Así se conserva el mismo Dockerfile para Docker local y Railway sin incorporar IDs del entorno.

Referencia: [Dockerfiles y cache mounts en Railway](https://docs.railway.com/builds/dockerfiles#cache-mounts).

## Comprobación después de publicar

1. Confirmar que `origin/main` contiene el commit esperado.
2. Revisar los estados de Railway para **HV.EGR** (web) y **glistening-integrity** (API). Ambos deben terminar correctamente; un despliegue fallido conserva la versión anterior.
3. Comprobar la respuesta de `/api/v1/health` en la API y abrir la web con una consulta nueva, por ejemplo `?deployment-check=<commit>`.
4. Verificar el cambio visible solicitado y el contenido de `/api/v1/profile` si se modificó la experiencia. La API ejecuta migraciones y semilla en su pre-despliegue; cambiar el archivo de datos no actualiza por sí solo PostgreSQL.
5. Para cambios de marca, comprobar `/icon.svg` y la navegación en temas claro y oscuro. El navegador puede conservar el favicon después de actualizar la página.

No cambiar variables, reiniciar PostgreSQL ni borrar volúmenes para resolver un fallo de compilación. Consultar primero los logs del despliegue fallido.
