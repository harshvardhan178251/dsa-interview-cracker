<#
.SYNOPSIS
    Runs a single DSA problem, optionally with your own stdin.

.DESCRIPTION
    Builds the repository (via the Maven wrapper) and runs one problem class.
    The problem is identified as <topic>.<ClassName>, e.g. arrays.TwoSum.

.PARAMETER Problem
    The problem to run, in the form <topic>.<ClassName>.

.PARAMETER InputText
    Text to feed to the program on stdin. Newlines may be written as `n, or
    supplied as a real multi-line here-string.

.PARAMETER SkipBuild
    Skip the build step and use the classes already in target/classes.

.EXAMPLE
    .\scripts\run.ps1 arrays.TwoSum
    .\scripts\run.ps1 arrays.TwoSum "4`n2 7 11 15`n9"
    .\scripts\run.ps1 arrays.TwoSum @"
4
2 7 11 15
9
"@
#>
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Problem,

    [Alias('Input')]
    [Parameter(Position = 1)]
    [string]$InputText = "",

    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
. "$PSScriptRoot\env.ps1"

if (-not $SkipBuild) {
    Write-Host "Building..." -ForegroundColor DarkGray
    & cmd /c "mvnw.cmd -q -DskipTests package"
    if ($LASTEXITCODE -ne 0) { throw "Build failed." }
}

$class = $Problem
$topic = $null
if ($Problem -match '\.') {
    $parts = $Problem -split '\.'
    $topic = $parts[0]
    $class = $parts[1]
}
else {
    $topic = (Get-ChildItem "src\main\java\com\dsa" -Directory | Where-Object {
        Test-Path "src\main\java\com\dsa\$($_)\$Problem.java"
    } | Select-Object -First 1).Name
}

if (-not $topic) {
    throw "Could not resolve topic for problem '$Problem'. Use the form <topic>.<ClassName>."
}

$source = "src\main\java\com\dsa\$topic\$class.java"
if (-not (Test-Path $source)) {
    throw "No such problem: $source"
}

$cp = "target\classes"
Write-Host "Running $topic.$class" -ForegroundColor Cyan

if ($InputText) {
    $InputText | & java -cp $cp "com.dsa.$topic.$class"
}
else {
    & java -cp $cp "com.dsa.$topic.$class"
}
