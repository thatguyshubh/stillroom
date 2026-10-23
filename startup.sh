#!/usr/bin/env bash

# Stillroom MVP - macOS / Linux Launcher
set -e

# Change to the directory of this script
cd "$(dirname "$0")"

echo "========================================================"
echo "  Stillroom - You deserve to be heard."
echo "  Starting local prototype for demonstration..."
echo "========================================================"
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in PATH."
    echo "Please install Node.js from https://nodejs.org/ (or run 'brew install node')"
    exit 1
fi

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo "[1/2] Installing dependencies..."
    npm install
else
    echo "[1/2] Dependencies already installed."
fi

echo ""
echo "[2/2] Launching Stillroom development server..."
echo "Stillroom will open at: http://127.0.0.1:5173/"
echo ""

# Open browser in the background (macOS uses 'open', Linux uses 'xdg-open')
if [[ "$OSTYPE" == "darwin"* ]]; then
    (sleep 1 && open "http://127.0.0.1:5173/") &
elif command -v xdg-open &> /dev/null; then
    (sleep 1 && xdg-open "http://127.0.0.1:5173/") &
fi

exec npm run dev -- --host 127.0.0.1 --port 5173
