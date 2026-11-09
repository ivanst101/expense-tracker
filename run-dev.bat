@echo off
echo Starting both frontend and backend development servers...
start cmd /k "cd client && npm run dev"
start cmd /k "cd server && npm run dev"