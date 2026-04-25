@echo off
echo Starting PureBiome development servers...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call pnpm install
    echo.
)

REM Start Medusa backend in a new window
echo Starting Medusa backend on port 9000...
start "Medusa Backend" cmd /k "cd services\medusa && pnpm dev"

REM Wait a few seconds for Medusa to start
timeout /t 5 /nobreak > nul

REM Start Next.js storefront in a new window
echo Starting Next.js storefront on port 8000...
start "Storefront" cmd /k "cd apps\storefront && pnpm dev"

echo.
echo ========================================
echo Development servers starting...
echo ========================================
echo Medusa:     http://localhost:9000
echo Storefront: http://localhost:8000
echo.
echo Wait 30-60 seconds for both servers to be ready.
echo Then visit: http://localhost:8000/au
echo.
echo Press any key to close this window (servers will keep running)
pause > nul
