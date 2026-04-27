@echo off
echo Cleaning caches...
if exist .next rmdir /s /q .next
if exist dist rmdir /s /q dist

echo Copying config...
copy /Y next.config.github.js next.config.js

echo Setting environment...
set NEXT_PUBLIC_DEMO_MODE=true
set STATIC_EXPORT=true
set SKIP_ENV_VALIDATION=true
set NEXT_PUBLIC_BASE_URL=https://purebio.me

echo Building...
pnpm run build

echo Done!
