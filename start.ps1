# PowerShell script to start vibeDesi application

Write-Host "Starting vibeDesi Application..." -ForegroundColor Green
Write-Host ""

# Check if MongoDB is running
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $mongoRunning = Get-Process -Name mongod -ErrorAction SilentlyContinue
    if (-not $mongoRunning) {
        Write-Host "Warning: MongoDB doesn't seem to be running!" -ForegroundColor Red
        Write-Host "Please start MongoDB before running the application." -ForegroundColor Yellow
        Write-Host ""
        Read-Host "Press Enter to continue anyway..."
    } else {
        Write-Host "MongoDB is running." -ForegroundColor Green
    }
} catch {
    Write-Host "Could not check MongoDB status." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"
Start-Sleep -Seconds 3

Write-Host "Starting frontend development server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host ""
Write-Host "✓ Backend is running on http://localhost:5000" -ForegroundColor Green
Write-Host "✓ Frontend is running on http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser and navigate to http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C in each terminal to stop the servers" -ForegroundColor Yellow


