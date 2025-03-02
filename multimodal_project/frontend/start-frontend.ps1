# Navigate to the frontend directory
Set-Location -Path $PSScriptRoot

# Ensure node_modules exists
if (-not (Test-Path -Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Remove .next directory if it exists to ensure clean build
if (Test-Path -Path ".next") {
    Write-Host "Removing previous build..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force
}

# Start the development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
npm run dev 