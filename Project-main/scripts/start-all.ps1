$root = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $root "Project-Backend"
$frontendPath = Join-Path $root "Project-Frontend"

Write-Host "Starting backend in a new PowerShell window..."
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$backendPath'; npm run start"
)

Write-Host "Starting frontend in a new PowerShell window..."
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$frontendPath'; npm run dev"
)

Write-Host "Frontend and backend are starting."
Write-Host "Backend:  http://localhost:3000"
Write-Host "Frontend: check the Vite window for the local URL"
