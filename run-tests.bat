@echo off
cd /d "%~dp0"
echo Running Unit and Integration Tests (Vitest)...
"C:\Users\SS\.local\node\npm.cmd" run test
pause
