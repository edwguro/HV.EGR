# Convenciones para agentes y colaboradores

## Comandos

- Desarrollo: `corepack pnpm dev`
- Tipos: `corepack pnpm typecheck`
- Lint: `corepack pnpm lint`
- Pruebas: `corepack pnpm test`
- Build: `corepack pnpm build`
- Semilla: `corepack pnpm db:seed`

## Reglas

- Mantener TypeScript estricto y evitar `any`.
- No exponer secretos ni añadir claves reales al repositorio.
- Validar toda entrada pública con DTOs.
- Mantener controladores pequeños y reglas en servicios.
- Actualizar contratos compartidos antes de cambiar respuestas públicas.
- Crear migraciones para cambios persistentes; no editar migraciones aplicadas.
- Respetar accesibilidad, navegación por teclado y movimiento reducido.
- Ejecutar formato, lint, tipos y pruebas antes de entregar.

## Definición de terminado

Una tarea está terminada cuando la implementación funciona, no deja placeholders evitables, tiene validación proporcional al riesgo, conserva compatibilidad responsive y la documentación refleja cualquier cambio operativo.
