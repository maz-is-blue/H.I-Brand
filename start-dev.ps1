# H.I. Brands — start both dev servers
# Run from the H.I.Brand folder: .\start-dev.ps1

Write-Host "Starting Laravel API on http://localhost:8000" -ForegroundColor Yellow
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd backend; php artisan serve'

Write-Host "Starting React dev server on http://localhost:5173" -ForegroundColor Yellow
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd frontend; npm run dev'

Write-Host ""
Write-Host "Open http://localhost:5173 in your browser." -ForegroundColor Green
Write-Host "Admin panel: http://localhost:5173/admin  (password: hibrands)" -ForegroundColor Green
