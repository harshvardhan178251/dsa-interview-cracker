<#
.SYNOPSIS
    Runs the full JUnit test suite.
#>
param(
    [string]$Test = ""
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
. "$PSScriptRoot\env.ps1"

if ($Test) {
    & cmd /c "mvnw.cmd test -Dtest=$Test"
}
else {
    & cmd /c "mvnw.cmd test"
}

if ($LASTEXITCODE -ne 0) {
    throw "Tests failed."
}
Write-Host "All tests passed." -ForegroundColor Green
