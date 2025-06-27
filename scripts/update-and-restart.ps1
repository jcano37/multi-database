# Stop current containers
Write-Host "🔄 Stopping containers..." -ForegroundColor Yellow
docker-compose down

# Rebuild the application image
Write-Host "🏗️ Rebuilding the application image..." -ForegroundColor Yellow
docker-compose build app

# Start containers
Write-Host "🚀 Starting containers..." -ForegroundColor Yellow
docker-compose up -d
