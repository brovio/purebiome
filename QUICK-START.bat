@echo off
echo Killing any existing servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak > nul

echo.
echo Starting Medusa backend...
start "Medusa (port 9000)" cmd /k "cd services\medusa && pnpm dev"

echo Waiting 8 seconds for Medusa...
timeout /t 8 /nobreak

echo.
echo Starting Storefront...
start "Storefront (port 8000)" cmd /k "cd apps\storefront && pnpm dev"

echo.
echo ==========================================
echo SERVERS STARTING...
echo ==========================================
echo.
echo Medusa:     http://localhost:9000
echo Storefront: http://localhost:8000/au
echo.
echo Wait 45-60 seconds, then open:
echo   http://localhost:8000/au
echo.
pause
