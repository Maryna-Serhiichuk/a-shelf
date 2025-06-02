@echo off
cd backend
start cmd /k "yarn dev"
cd ..\frontend
start cmd /k "yarn dev"