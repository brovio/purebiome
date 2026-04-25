@echo off
REM Build static export for Netlify Drop

echo ========================================
echo Building Static Export for Netlify Drop
echo ========================================
echo.

cd apps\storefront

echo Step 1: Cleaning previous build...
if exist .next rmdir /s /q .next
if exist dist rmdir /s /q dist

echo.
echo Step 2: Building static export...
echo This creates a 'dist' folder with pure HTML/CSS/JS
echo.

pnpm build

if %errorlevel% neq 0 (
    echo.
    echo BUILD FAILED
    echo Check the errors above
    pause
    exit /b 1
)

echo.
echo ========================================
echo BUILD SUCCESSFUL!
echo ========================================
echo.
echo Your static site is ready at:
echo   %cd%\dist
echo.
echo NEXT STEP:
echo 1. Go to https://app.netlify.com/drop
echo 2. Drag the ENTIRE 'dist' folder (not .next!)
echo 3. Your site goes live instantly
echo.
pause
