@echo off
setlocal
pushd "%~dp0"

set "PATH=%CD%\tools\bin;%PATH%"

echo [1/4] Iniciando PostgreSQL...
docker compose up -d postgres
if errorlevel 1 goto :error

echo [2/4] Generando Prisma Client...
call corepack pnpm db:generate
if errorlevel 1 goto :error

echo [3/4] Cargando datos de la HV...
call corepack pnpm db:seed
if errorlevel 1 goto :error

echo [4/4] Iniciando web y API...
echo Web: http://localhost:3000
echo API: http://localhost:4000/api/v1/health
echo Swagger: http://localhost:4000/docs
echo.

powershell -NoProfile -Command "$watcher = Get-CimInstance Win32_Process -Filter \"Name = 'node.exe'\" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like '*watch-resume.mjs*' }; if ($watcher) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo Activando actualizacion automatica de resume.ts...
  start "Portfolio HV Watcher" /B cmd /c "node tools\watch-resume.mjs ^> resume-watch.log 2^>^&1"
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 4000 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo Iniciando API en segundo plano...
  start "Portfolio API" /B cmd /c "call corepack pnpm --filter api dev ^> api-dev.log 2^>^&1"
) else (
  echo API ya esta activa en el puerto 4000.
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo Iniciando frontend...
  echo Presiona Ctrl+C para detener el frontend.
  call corepack pnpm --filter web dev
) else (
  echo La web ya esta activa en http://localhost:3000
)
goto :end

:error
echo.
echo No fue posible iniciar la aplicacion. Revisa el mensaje anterior.
exit /b 1

:end
popd
endlocal
