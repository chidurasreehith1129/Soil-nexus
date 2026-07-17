# FarmSense API Watchdog - PowerShell version
# Monitors port 5000 and restarts the server if it goes down

param (
    [string]$ServerDir = "f:\Backend(Makers)",
    [string]$Script    = "Agri_hub.py",
    [int]   $CheckInterval = 15    # seconds between checks
)

function Is-ServerAlive {
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $connect = $tcp.BeginConnect("127.0.0.1", 5000, $null, $null)
        $wait = $connect.AsyncWaitHandle.WaitOne(1000, $false)
        if ($wait -and $tcp.Connected) {
            $tcp.Close()
            return $true
        }
        $tcp.Close()
        return $false
    } catch {
        return $false
    }
}

Write-Host "[FarmSense Watchdog] Started. Monitoring port 5000 every $CheckInterval seconds." -ForegroundColor Cyan

$serverProcess = $null

while ($true) {
    if (-not (Is-ServerAlive)) {
        # Kill any stale python processes on port 5000
        try {
            $stale = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
            if ($stale) {
                Stop-Process -Id $stale -Force -ErrorAction SilentlyContinue
                Start-Sleep -Seconds 1
            }
        } catch {}

        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Server offline. Starting..." -ForegroundColor Yellow

        $serverProcess = Start-Process -FilePath "python" `
            -ArgumentList $Script `
            -WorkingDirectory $ServerDir `
            -PassThru `
            -WindowStyle Minimized

        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Server started (PID $($serverProcess.Id))" -ForegroundColor Green
        Start-Sleep -Seconds 5   # Give it time to boot
    } else {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Server OK on port 5000" -ForegroundColor DarkGreen
    }

    Start-Sleep -Seconds $CheckInterval
}
