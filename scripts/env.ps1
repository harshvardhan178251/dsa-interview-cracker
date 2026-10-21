<#
.SYNOPSIS
    Makes sure JAVA_HOME points at a JDK that actually exists, and that its bin
    directory is on PATH.

.DESCRIPTION
    Windows images often ship with a JAVA_HOME pointing at a JDK that was
    uninstalled, which makes `java`, `javac` and the Maven wrapper fail with a
    confusing "not recognized as an internal or external command".

    Dot-source this from any script that needs the JDK:

        . "$PSScriptRoot\env.ps1"

    It prefers an existing $env:JAVA_HOME, then falls back to the usual
    install locations.
#>

function Get-ValidJdkHome {
    $candidates = @()

    if ($env:JAVA_HOME) {
        $candidates += $env:JAVA_HOME
    }

    foreach ($root in @(
            'C:\Program Files\Eclipse Adoptium',
            'C:\Program Files\Java',
            'C:\Program Files\Microsoft',
            'C:\Program Files\Zulu',
            'C:\Program Files\Amazon Corretto',
            'C:\Program Files\BellSoft',
            'C:\Program Files\Oracle'
        )) {
        if (Test-Path $root) {
            $candidates += (Get-ChildItem $root -Directory -ErrorAction SilentlyContinue |
                ForEach-Object { $_.FullName })
        }
    }

    foreach ($candidate in $candidates) {
        if (-not $candidate) { continue }
        if (Test-Path (Join-Path $candidate 'bin\javac.exe')) {
            return $candidate
        }
    }
    return $null
}

$jdkHome = Get-ValidJdkHome

if ($jdkHome) {
    $env:JAVA_HOME = $jdkHome
    $jdkBin = Join-Path $jdkHome 'bin'
    if (-not (($env:Path -split ';') -contains $jdkBin)) {
        $env:Path = "$jdkBin;$env:Path"
    }
}
else {
    Write-Warning "No JDK found. Install a JDK 17+ and set JAVA_HOME."
}
