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
echo Web HV.EGR: http://localhost:3100
echo API HV.EGR: http://localhost:4100/api/v1/health
echo Swagger HV.EGR: http://localhost:4100/docs
echo.

powershell -NoProfile -Command "$watcher = Get-CimInstance Win32_Process -Filter \"Name = 'node.exe'\" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like '*watch-resume.mjs*' }; if ($watcher) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo Activando actualizacion automatica de resume.ts...
  start "Portfolio HV Watcher" /B cmd /c "node tools\watch-resume.mjs ^> resume-watch.log 2^>^&1"
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 4100 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if not errorlevel 1 (
  echo El puerto 4100 ya esta ocupado. Cierra el proceso indicado antes de iniciar HV.EGR.
  exit /b 1
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 3100 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if not errorlevel 1 (
  echo El puerto 3100 ya esta ocupado. Cierra el proceso indicado antes de iniciar HV.EGR.
  exit /b 1
)

echo Iniciando HV.EGR en puertos exclusivos...
echo Presiona Ctrl+C para detener la web y API.
call corepack pnpm dev
goto :end

:error
echo.
echo No fue posible iniciar la aplicacion. Revisa el mensaje anterior.
exit /b 1

:end
popd
endlocal
