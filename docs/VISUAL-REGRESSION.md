# Cintas y mockups de HV.EGR

Las cintas de trayectoria, educación, proyectos y habilidades comparten
`AutoScrollRibbon` y el ancho del contenido del perfil. Conservan deslizamiento
táctil, scroll, teclado y controles anterior/siguiente. Muestran de una a cuatro
tarjetas completas según el ancho disponible; avanzan por grupos cada seis
segundos, solo cuando son visibles y no hay interacción. La preferencia de
movimiento reducido desactiva el avance automático.

Todas las portadas de proyectos usan proporción 3:2 y `object-contain`: no
recortar capturas ni cambiar su altura según el slug. El mockup HV.EGR conserva
la composición de portátil y teléfono del commit `c731daa`.

El navbar usa tokens de color independientes para los temas claro y oscuro.
Validar con `corepack pnpm test:e2e e2e/ribbons-layout.spec.ts`, además de
lint, tipos, pruebas y build. Comprobar móvil, tablet, escritorio, navegación por
teclado y texto ampliado. Estos ajustes no requieren migraciones ni semillas.
