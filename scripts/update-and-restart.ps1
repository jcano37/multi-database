# Detener los contenedores actuales
Write-Host "🔄 Deteniendo contenedores..." -ForegroundColor Yellow
docker-compose down

# Reconstruir la imagen de la aplicación
Write-Host "🏗️ Reconstruyendo la imagen de la aplicación..." -ForegroundColor Yellow
docker-compose build app

# Iniciar los contenedores
Write-Host "🚀 Iniciando contenedores..." -ForegroundColor Yellow
docker-compose up -d
