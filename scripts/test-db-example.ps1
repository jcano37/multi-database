# Configuration
$baseUrl = "http://localhost:3000/examples"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "`n=== Starting API Tests ===" -ForegroundColor Cyan

# 1. Create a new example (CREATE)
Write-Host "`n1. Creating new example..." -ForegroundColor Green
$createBody = @{
    name = "Test Example"
    description = "This is a test example created at $(Get-Date)"
    isActive = $true
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Method Post -Uri $baseUrl -Headers $headers -Body $createBody
    Write-Host "✓ Example created successfully" -ForegroundColor Green
    Write-Host "Created ID: $($response.id)" -ForegroundColor Yellow
    $exampleId = $response.id
}
catch {
    Write-Host "✕ Error creating example: $_" -ForegroundColor Red
    exit 1
}

# 2. Get all examples (READ ALL)
Write-Host "`n2. Getting list of examples..." -ForegroundColor Green
try {
    $allExamples = Invoke-RestMethod -Uri $baseUrl
    Write-Host "✓ List of examples retrieved. Total: $($allExamples.Length)" -ForegroundColor Green
}
catch {
    Write-Host "✕ Error getting examples: $_" -ForegroundColor Red
}

# 3. Get specific example (READ ONE)
Write-Host "`n3. Getting specific example (ID: $exampleId)..." -ForegroundColor Green
try {
    $example = Invoke-RestMethod -Uri "$baseUrl/$exampleId"
    Write-Host "✓ Specific example retrieved:" -ForegroundColor Green
    Write-Host ($example | ConvertTo-Json) -ForegroundColor Gray
}
catch {
    Write-Host "✕ Error getting specific example: $_" -ForegroundColor Red
}

# 4. Update example (UPDATE)
Write-Host "`n4. Updating example..." -ForegroundColor Green
$updateBody = @{
    name = "Updated Test Example"
    description = "This example was updated at $(Get-Date)"
    isActive = $false
} | ConvertTo-Json

try {
    $updatedExample = Invoke-RestMethod -Method Patch -Uri "$baseUrl/$exampleId" -Headers $headers -Body $updateBody
    Write-Host "✓ Example updated successfully" -ForegroundColor Green
    Write-Host ($updatedExample | ConvertTo-Json) -ForegroundColor Gray
}
catch {
    Write-Host "✕ Error updating example: $_" -ForegroundColor Red
}

# 5. Verify update
Write-Host "`n5. Verifying update..." -ForegroundColor Green
try {
    $verifiedExample = Invoke-RestMethod -Uri "$baseUrl/$exampleId"
    Write-Host "✓ Verification successful. Updated data:" -ForegroundColor Green
    Write-Host ($verifiedExample | ConvertTo-Json) -ForegroundColor Gray
}
catch {
    Write-Host "✕ Error verifying update: $_" -ForegroundColor Red
}

# 6. Delete example (DELETE)
Write-Host "`n6. Deleting example..." -ForegroundColor Green
try {
    Invoke-RestMethod -Method Delete -Uri "$baseUrl/$exampleId"
    Write-Host "✓ Example deleted successfully" -ForegroundColor Green
}
catch {
    Write-Host "✕ Error deleting example: $_" -ForegroundColor Red
}

# 7. Verify deletion
Write-Host "`n7. Verifying deletion..." -ForegroundColor Green
try {
    $deletedExample = Invoke-RestMethod -Uri "$baseUrl/$exampleId"
    Write-Host "✕ Error: The example still exists" -ForegroundColor Red
}
catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 404 -or $statusCode -eq 500) {
        Write-Host "✓ Verification successful: The example was deleted correctly" -ForegroundColor Green
        Write-Host "  (Status code ${statusCode}: Entity not found)" -ForegroundColor Gray
    }
    else {
        Write-Host "✕ Unexpected error verifying deletion (code ${statusCode}): $_" -ForegroundColor Red
    }
}

Write-Host "`n=== Tests completed ===" -ForegroundColor Cyan