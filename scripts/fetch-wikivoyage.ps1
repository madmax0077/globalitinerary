$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$cities = Get-Content (Join-Path $root "city-targets.json") -Raw | ConvertFrom-Json
$mapPath = Join-Path $root "wikivoyage-map.json"

$map = @{}
if (Test-Path $mapPath) {
  $existing = Get-Content $mapPath -Raw | ConvertFrom-Json
  foreach ($p in $existing.PSObject.Properties) {
    $obj = @{}
    foreach ($cat in $p.Value.PSObject.Properties) { $obj[$cat.Name] = @($cat.Value) }
    $map[$p.Name] = $obj
  }
}

# Unique Wikipedia/Wikivoyage titles to look up.
$titles = @($cities | ForEach-Object { $_.wikiTitle } | Select-Object -Unique)
$todo = @($titles | Where-Object { -not $map.ContainsKey($_) })
Write-Output ("todo: {0} (already have {1})" -f $todo.Count, $map.Count)

function Clean-Name([string]$s) {
  if (-not $s) { return "" }
  $s = [regex]::Replace($s, '\[\[[^\]|]*\|', '')
  $s = $s -replace '\[\[', '' -replace '\]\]', ''
  $s = [regex]::Replace($s, '\[https?:[^\s\]]+\s+([^\]]+)\]', '$1')
  $s = $s -replace '\[https?:[^\]]*\]', ''
  $s = $s -replace "'''", '' -replace "''", ''
  $s = [regex]::Replace($s, '<[^>]+>', '')
  $s = [regex]::Replace($s, '\{\{[^}]*\}\}', '')
  $s = ($s -replace '\s+', ' ').Trim()
  return $s
}

function Save-Map { param($m, $path)
  $json = $m | ConvertTo-Json -Depth 5
  [System.IO.File]::WriteAllText($path, $json, [System.Text.Encoding]::UTF8)
}

$cats = @('eat', 'see', 'do', 'drink', 'buy', 'sleep')
$done = 0
foreach ($t in $todo) {
  $enc = [uri]::EscapeDataString($t)
  $url = "https://en.wikivoyage.org/w/api.php?action=parse&page=$enc&prop=wikitext&format=json&redirects=1"
  $attempt = 0; $ok = $false
  while (-not $ok -and $attempt -lt 4) {
    $attempt++
    try {
      $resp = Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = 'VoyaraTravelGuide/1.0 (contact: demo@example.com)' } -TimeoutSec 60
      $wt = $resp.parse.wikitext.'*'
      $result = @{}
      foreach ($c in $cats) { $result[$c] = New-Object System.Collections.ArrayList }
      if ($wt) {
        $matches = [regex]::Matches($wt, '(?is)\{\{\s*(eat|see|do|drink|buy|sleep|listing)\b(.*?)\}\}')
        foreach ($mm in $matches) {
          $tpl = $mm.Groups[1].Value.ToLower()
          $body = $mm.Groups[2].Value
          $cat = $tpl
          if ($tpl -eq 'listing') {
            $tm = [regex]::Match($body, '(?is)\|\s*type\s*=\s*([a-z]+)')
            if (-not $tm.Success) { continue }
            $cat = $tm.Groups[1].Value.ToLower()
          }
          if (-not $result.ContainsKey($cat)) { continue }
          $nm = [regex]::Match($body, '(?is)\|\s*name\s*=\s*([^|}\n]+)')
          if (-not $nm.Success) { continue }
          $name = Clean-Name $nm.Groups[1].Value
          if ($name.Length -lt 2 -or $name.Length -gt 60) { continue }
          if (($result[$cat] | Where-Object { $_.ToLower() -eq $name.ToLower() }).Count -gt 0) { continue }
          if ($result[$cat].Count -lt 8) { [void]$result[$cat].Add($name) }
        }
      }
      $store = @{}
      foreach ($c in $cats) { if ($result[$c].Count -gt 0) { $store[$c] = @($result[$c]) } }
      $map[$t] = $store
      $ok = $true
    } catch {
      $msg = $_.Exception.Message
      if ($msg -match '429') { Start-Sleep -Seconds (2 * $attempt) }
      elseif ($msg -match '404') { $map[$t] = @{}; $ok = $true }
      else { Start-Sleep -Milliseconds 500 }
    }
  }
  $done++
  if ($done % 100 -eq 0) { Save-Map $map $mapPath; Write-Output ("...{0} processed" -f $done) }
  Start-Sleep -Milliseconds 200
}

Save-Map $map $mapPath
$withData = ($map.Values | Where-Object { $_.Keys.Count -gt 0 }).Count
Write-Output ("done. cities with >=1 real listing: {0} / {1}" -f $withData, $map.Count)
