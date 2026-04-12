@echo off
title FluxStudio.exe bauen
cd /d "%~dp0"

echo.
echo  ===================================================
echo   Flux Studio Launcher bauen
echo  ===================================================
echo.

echo  [1/2] Kompiliere mit PyInstaller...
echo.
pyinstaller --onefile --windowed --name "FluxStudio" --clean launcher.py

if errorlevel 1 (
    echo.
    echo  [FEHLER] PyInstaller ist gescheitert.
    echo  Bitte sicherstellen dass PyInstaller installiert ist:
    echo    pip install pyinstaller
    pause
    exit /b 1
)

echo.
echo  [2/2] Kopiere FluxStudio.exe ins Projektverzeichnis...
copy /Y "dist\FluxStudio.exe" "..\FluxStudio.exe" >nul

if errorlevel 1 (
    echo  [FEHLER] Kopieren fehlgeschlagen.
    pause
    exit /b 1
)

echo.
echo  ===================================================
echo   Fertig! FluxStudio.exe wurde erstellt.
echo   Ort: %~dp0..\FluxStudio.exe
echo  ===================================================
echo.
pause
