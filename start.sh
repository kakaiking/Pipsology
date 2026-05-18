#!/bin/bash

# Ensure we run from the project root (location of this script)
cd "$(dirname "$0")"

echo "🚀 Starting Next.js dev server..."
# Start the development server
npm run dev &
DEV_PID=$!

echo "⏳ Waiting for server to initialize..."
sleep 3

# Open the app in the default browser based on OS (Linux or macOS)
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:3001/TradeyMarkets/"
elif command -v open > /dev/null; then
    open "http://localhost:3001/TradeyMarkets/"
else
    echo "🔗 Dev server running. Open: http://localhost:3001/TradeyMarkets/ in your browser."
fi

# Wait for the background process (Next.js server) so logs are printed and Ctrl+C terminates it properly
wait $DEV_PID
