<#
.SYNOPSIS
    Regenerates the website data from the Java sources and (optionally) starts the dev server.

.DESCRIPTION
    The site reads its catalogue from web/src/data/*.json, which is generated from the
    Java problem tree. Run this after adding or editing any problem.
#>
param(
    [switch]$NoServe,
    [switch]$SkipTests
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
. "$PSScriptRoot\env.ps1"

Write-Host "Regenerating guides and site data..." -ForegroundColor Cyan
Push-Location "web"
& npm run gen:guides
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "Guide generation failed." }
& npm run gen:data
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "Data generation failed." }
Pop-Location

if (-not $SkipTests) {
    Write-Host "Running tests..." -ForegroundColor Cyan
    & cmd /c "mvnw.cmd -q test"
    if ($LASTEXITCODE -ne 0) { throw "Tests failed." }
}

if (-not $NoServe) {
    Write-Host "Starting the dev server on http://localhost:5173" -ForegroundColor Green
    Push-Location "web"
    & npm run dev
    Pop-Location
}
