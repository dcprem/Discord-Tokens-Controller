@echo off
cls

if exist node_modules\ (
  echo Launch of the current program..
  timeout /t 3 /nobreak > NUL
  cls
  node index.js
  pause
) else (
  echo The libraries file does not exist !
  echo Installing the necessary files..
  timeout /t 3 /nobreak > NUL
  cls
  npm i
  SET mypath=%~dp0
  cd %mypath:~0,-1%
  :loop
  Start start.bat | set /P "="
  goto loop
  exit
)