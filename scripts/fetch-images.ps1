$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$titles = Get-Content (Join-Path $root "image-titles.json") -Raw | ConvertFrom-Json
$mapPath = Join-Path $root "images-map.json"

$map = @{}
if (Test-Path $mapPath) {
  $existing = Get-Content $mapPath -Raw | ConvertFrom-Json
  foreach ($p in $existing.PSObject.Properties) { $map[$p.Name] = $p.Value }
}

# Only fetch titles we don't already have.
$todo = @($titles | Where-Object { -not $map.ContainsKey($_) })
Write-Output ("todo: {0} (already have {1})" -f $todo.Count, $map.Count)

$batchSize = 20
$total = $todo.Count

function Save-Map {
  param($m, $path)
  $json = $m | ConvertTo-Json -Depth 3
  [System.IO.File]::WriteAllText($path, $json)
}

for ($i = 0; $i -lt $total; $i += $batchSize) {
  $end = [Math]::Min($i + $batchSize - 1, $total - 1)
  $batch = $todo[$i..$end]
  $joined = ($batch -join '|')
  $enc = [uri]::EscapeDataString($joined)
  $url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1280&pilimit=50&redirects=1&titles=$enc"

  $attempt = 0
  $ok = $false
  while (-not $ok -and $attempt -lt 5) {
    $attempt++
    try {
      $resp = Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = 'VoyaraTravelGuide/1.0 (contact: demo@example.com)' } -TimeoutSec 90
      $resolve = @{}
      if ($resp.query.normalized) { foreach ($n in $resp.query.normalized) { $resolve[$n.from] = $n.to } }
      if ($resp.query.redirects) { foreach ($r in $resp.query.redirects) { $resolve[$r.from] = $r.to } }
      $titleToThumb = @{}
      foreach ($p in $resp.query.pages.PSObject.Properties.Value) {
        if ($p.thumbnail -and $p.thumbnail.source) { $titleToThumb[$p.title] = $p.thumbnail.source }
      }
      foreach ($t in $batch) {
        $final = $t
        for ($hop = 0; $hop -lt 3; $hop++) { if ($resolve.ContainsKey($final)) { $final = $resolve[$final] } }
        if ($titleToThumb.ContainsKey($final)) { $map[$t] = $titleToThumb[$final] }
        elseif ($titleToThumb.ContainsKey($t)) { $map[$t] = $titleToThumb[$t] }
      }
      $ok = $true
    } catch {
      $msg = $_.Exception.Message
      if ($msg -match "429") {
        $wait = 3 * $attempt
        Write-Output ("429 at batch {0}, backoff {1}s (attempt {2})" -f $i, $wait, $attempt)
        Start-Sleep -Seconds $wait
      } else {
        Write-Output ("batch {0} error: {1}" -f $i, $msg)
        break
      }
    }
  }

  if ($i % 200 -eq 0) { Save-Map $map $mapPath }
  Start-Sleep -Milliseconds 800
}

Save-Map $map $mapPath
Write-Output ("mapped {0} / {1} total titles" -f $map.Count, $titles.Count)
