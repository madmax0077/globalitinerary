$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$titles = Get-Content (Join-Path $root "image-titles.json") -Raw | ConvertFrom-Json
$mapPath = Join-Path $root "gallery-map.json"

$map = @{}
if (Test-Path $mapPath) {
  $existing = Get-Content $mapPath -Raw | ConvertFrom-Json
  foreach ($p in $existing.PSObject.Properties) { $map[$p.Name] = @($p.Value) }
}

# Filenames that are not real scenic photos of the place.
$bad = 'map|flag|locator|coat[_ ]?of[_ ]?arms|blason|wappen|escudo|bandera|drapeau|\.svg|\.ogg|\.webm|logo|seal|icon|symbol|orthographic|location|\.png$|emblem|insignia'

$todo = @($titles | Where-Object { -not $map.ContainsKey($_) })
Write-Output ("todo: {0} (already have {1})" -f $todo.Count, $map.Count)

function Save-Map { param($m, $path)
  ($m | ConvertTo-Json -Depth 4) | ForEach-Object { [System.IO.File]::WriteAllText($path, $_) }
}

$done = 0
foreach ($t in $todo) {
  $enc = [uri]::EscapeDataString($t)
  $url = "https://en.wikipedia.org/api/rest_v1/page/media-list/$enc"
  $attempt = 0
  $ok = $false
  while (-not $ok -and $attempt -lt 4) {
    $attempt++
    try {
      $resp = Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = 'VoyaraTravelGuide/1.0 (contact: demo@example.com)' } -TimeoutSec 60
      $urls = New-Object System.Collections.ArrayList
      foreach ($item in $resp.items) {
        if ($item.type -ne 'image') { continue }
        if (-not $item.showInGallery) { continue }
        if ($item.title -and ($item.title.ToLower() -match $bad)) { continue }
        if (-not $item.srcset -or $item.srcset.Count -eq 0) { continue }
        $src = ($item.srcset | Select-Object -Last 1).src
        if (-not $src) { continue }
        if ($src.StartsWith('//')) { $src = 'https:' + $src }
        if ($src.ToLower() -match '\.svg') { continue }
        [void]$urls.Add($src)
        if ($urls.Count -ge 5) { break }
      }
      $map[$t] = @($urls)
      $ok = $true
    } catch {
      $msg = $_.Exception.Message
      if ($msg -match '429') { Start-Sleep -Seconds (2 * $attempt) }
      elseif ($msg -match '404') { $map[$t] = @(); $ok = $true }
      else { Start-Sleep -Milliseconds 500 }
    }
  }
  $done++
  if ($done % 100 -eq 0) { Save-Map $map $mapPath; Write-Output ("...{0} processed" -f $done) }
  Start-Sleep -Milliseconds 250
}

Save-Map $map $mapPath
$withPhotos = ($map.Values | Where-Object { $_.Count -gt 0 }).Count
Write-Output ("done. titles with >=1 gallery photo: {0} / {1}" -f $withPhotos, $map.Count)
