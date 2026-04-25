@echo off
REM PureBiome Production Deployment Script
REM This builds and deploys the storefront to Netlify

echo ========================================
echo PureBiome Production Deployment
echo ========================================
echo.

REM Check if Medusa is running
echo Checking Medusa backend...
curl -s http://localhost:9000/health >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo WARNING: Medusa backend not detected on port 9000
    echo Starting Medusa in new window...
    start "Medusa Server" cmd /k "cd services\medusa && pnpm dev"
    echo.
    echo Waiting 15 seconds for Medusa to start...
    timeout /t 15 /nobreak >nul
) else (
    echo Medusa backend: OK
)

echo.
echo Building storefront...
cd apps\storefront

REM Clean previous build
if exist .next (
    echo Cleaning previous build...
    rmdir /s /q .next
)

REM Build
pnpm build
if %errorlevel% neq 0 (
    echo.
    echo BUILD FAILED - Check errors above
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build successful!
echo ========================================
echo.
echo Deploy options:
echo.
echo 1. Deploy to Netlify (drag-and-drop):
echo    - Go to https://app.netlify.com/drop
echo    - Drag the .next folder from apps\storefront\
echo.
echo 2. Deploy with Netlify CLI (if configured):
echo    npx netlify deploy --prod --dir=.next
echo.
echo 3. Test locally first:
echo    pnpm start
echo    Then visit http://localhost:3000
echo.
echo Your .next folder is ready at:
cd
echo %cd%\.next
echo.
pause
