@echo off
title Stillroom MVP
echo ========================================================
echo   Stillroom - You deserve to be heard.
echo   Starting local prototype for demonstration...
echo ========================================================
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH.
    echo Please install Node.js from https://nodejs.org/ to run Stillroom.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
) else (
    echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Launching Stillroom development server...
echo Stillroom will open at: http://127.0.0.1:5173/
echo.

start "" "http://127.0.0.1:5173/"

call npm run dev -- --host 127.0.0.1 --port 5173

pause
