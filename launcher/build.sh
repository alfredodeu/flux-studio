#!/bin/bash
# Flux Studio Launcher – Linux Build
# Voraussetzung: pip install pyinstaller

set -e

cd "$(dirname "$0")"

echo "Installiere PyInstaller..."
pip install pyinstaller

echo "Baue FluxStudio..."
pyinstaller --onefile --name "FluxStudio" --clean launcher_linux.py

echo "Kopiere Binary..."
cp dist/FluxStudio ../FluxStudio
chmod +x ../FluxStudio

echo "Fertig! Starten mit: ./FluxStudio"
