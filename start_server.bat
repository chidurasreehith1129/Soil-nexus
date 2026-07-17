@echo off
:: FarmSense API Watchdog - Keeps the Flask server alive forever
title FarmSense API Watchdog

:LOOP
echo [%date% %time%] Starting FarmSense API Server...
cd /d "f:\Backend(Makers)"
python Agri_hub.py

echo [%date% %time%] Server stopped or crashed. Restarting in 3 seconds...
timeout /t 3 /nobreak >nul
goto LOOP
