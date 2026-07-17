$action   = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -NonInteractive -ExecutionPolicy Bypass -File `"f:\Backend(Makers)\watchdog.ps1`"" -WorkingDirectory "f:\Backend(Makers)"
$trigger  = New-ScheduledTaskTrigger -AtLogon
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 0) -RestartCount 10 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable
Register-ScheduledTask -TaskName "FarmSense API Watchdog" -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest -Force
Write-Host "FarmSense API Watchdog task registered successfully!"
