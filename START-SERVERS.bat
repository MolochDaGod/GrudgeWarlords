@echo off
echo.
echo ========================================
echo   GRUDGE WARLORDS - Starting Servers
echo ========================================
echo.
echo Starting all development servers...
echo.
echo Game Server will run on: http://localhost:3001
echo Editor Server will run on: http://localhost:5050
echo Hub Server will run on: http://localhost:8080
echo.
echo Press Ctrl+C to stop all servers
echo.

start "Game Server (Port 3001)" cmd /k "node server-game.js"
timeout /t 2 /nobreak >nul

start "Editor Server (Port 5050)" cmd /k "node server-editor.js"
timeout /t 2 /nobreak >nul

start "Hub Server (Port 8080)" cmd /k "node server.js"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   All servers started!
echo ========================================
echo.
echo Opening Hub in browser...
start http://localhost:8080
echo.
echo Check the separate terminal windows for server logs
echo.
pause

