@echo off
REM Start the Next.js dev server in a new window and open the app in the default browser

REM Ensure we run from the project root (location of this .bat)
pushd "%~dp0"

REM Open a new command window that runs the development server (keeps window open)
start "Next Dev" cmd /k "npm run dev"

REM Give the server a moment to start, then open the app in the default browser
timeout /t 3 /nobreak >nul
start "" "http://localhost:3001/TradeyMarkets/"

popd
exit /b 0
