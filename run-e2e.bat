@echo off
cd /d "%~dp0"
echo Running End-to-End Tests (Playwright)...
"C:\Users\SS\.local\node\npm.cmd" run test:e2e
pause
