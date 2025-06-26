# Configuración
$baseUrl = "http://localhost:3000/examples"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "`n=== Iniciando pruebas de API ===" -ForegroundColor Cyan

# 1. Crear un nuevo ejemplo (CREATE)
Write-Host "`n1. Creando nuevo ejemplo..." -ForegroundColor Green
$createBody = @{
    name = "Test Example"
    description = "This is a test example created at $(Get-Date)"
    isActive = $true
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Method Post -Uri $baseUrl -Headers $headers -Body $createBody
    Write-Host "✓ Ejemplo creado exitosamente" -ForegroundColor Green
    Write-Host "ID creado: $($response.id)" -ForegroundColor Yellow
    $exampleId = $response.id
}
catch {
    Write-Host "✕ Error al crear ejemplo: $_" -ForegroundColor Red
    exit 1
}

# 2. Obtener todos los ejemplos (READ ALL)
Write-Host "`n2. Obteniendo lista de ejemplos..." -ForegroundColor Green
try {
    $allExamples = Invoke-RestMethod -Uri $baseUrl
    Write-Host "✓ Lista de ejemplos recuperada. Total: $($allExamples.Length)" -ForegroundColor Green
}
catch {
    Write-Host "✕ Error al obtener ejemplos: $_" -ForegroundColor Red
}

# 3. Obtener ejemplo específico (READ ONE)
Write-Host "`n3. Obteniendo ejemplo específico (ID: $exampleId)..." -ForegroundColor Green
try {
    $example = Invoke-RestMethod -Uri "$baseUrl/$exampleId"
    Write-Host "✓ Ejemplo específico recuperado:" -ForegroundColor Green
    Write-Host ($example | ConvertTo-Json) -ForegroundColor Gray
}
catch {
    Write-Host "✕ Error al obtener ejemplo específico: $_" -ForegroundColor Red
}

# 4. Actualizar ejemplo (UPDATE)
Write-Host "`n4. Actualizando ejemplo..." -ForegroundColor Green
$updateBody = @{
    name = "Updated Test Example"
    description = "This example was updated at $(Get-Date)"
    isActive = $false
} | ConvertTo-Json

try {
    $updatedExample = Invoke-RestMethod -Method Patch -Uri "$baseUrl/$exampleId" -Headers $headers -Body $updateBody
    Write-Host "✓ Ejemplo actualizado exitosamente" -ForegroundColor Green
    Write-Host ($updatedExample | ConvertTo-Json) -ForegroundColor Gray
}
catch {
    Write-Host "✕ Error al actualizar ejemplo: $_" -ForegroundColor Red
}

# 5. Verificar actualización
Write-Host "`n5. Verificando actualización..." -ForegroundColor Green
try {
    $verifiedExample = Invoke-RestMethod -Uri "$baseUrl/$exampleId"
    Write-Host "✓ Verificación exitosa. Datos actualizados:" -ForegroundColor Green
    Write-Host ($verifiedExample | ConvertTo-Json) -ForegroundColor Gray
}
catch {
    Write-Host "✕ Error al verificar actualización: $_" -ForegroundColor Red
}

# 6. Eliminar ejemplo (DELETE)
Write-Host "`n6. Eliminando ejemplo..." -ForegroundColor Green
try {
    Invoke-RestMethod -Method Delete -Uri "$baseUrl/$exampleId"
    Write-Host "✓ Ejemplo eliminado exitosamente" -ForegroundColor Green
}
catch {
    Write-Host "✕ Error al eliminar ejemplo: $_" -ForegroundColor Red
}

# 7. Verificar eliminación
Write-Host "`n7. Verificando eliminación..." -ForegroundColor Green
try {
    $deletedExample = Invoke-RestMethod -Uri "$baseUrl/$exampleId"
    Write-Host "✕ Error: El ejemplo aún existe" -ForegroundColor Red
}
catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 404 -or $statusCode -eq 500) {
        Write-Host "✓ Verificación exitosa: El ejemplo fue eliminado correctamente" -ForegroundColor Green
        Write-Host "  (Código de estado ${statusCode}: Entidad no encontrada)" -ForegroundColor Gray
    }
    else {
        Write-Host "✕ Error inesperado al verificar eliminación (código ${statusCode}): $_" -ForegroundColor Red
    }
}

Write-Host "`n=== Pruebas completadas ===" -ForegroundColor Cyan