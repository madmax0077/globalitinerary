$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$mledoze = Get-Content (Join-Path $root "mledoze.json") -Raw | ConvertFrom-Json
$mapPath = Join-Path $root "country-info.json"

$names = @($mledoze | Where-Object { $_.unMember } | ForEach-Object { $_.name.common })

$map = @{}
if (Test-Path $mapPath) {
  $existing = Get-Content $mapPath -Raw | ConvertFrom-Json
  foreach ($p in $existing.PSObject.Properties) {
    $obj = @{}
    foreach ($s in $p.Value.PSObject.Properties) { $obj[$s.Name] = $s.Value }
    $map[$p.Name] = $obj
  }
}
$todo = @($names | Where-Object { -not $map.ContainsKey($_) })
Write-Output ("todo: {0} (already have {1})" -f $todo.Count, $map.Count)

function Clean-Text([string]$s) {
  if (-not $s) { return "" }
  $s = [regex]::Replace($s, '(?s)<ref[^>]*>.*?</ref>', '')
  $s = [regex]::Replace($s, '(?s)<ref[^>]*/>', '')
  $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
  # Drop file/image links
  $s = [regex]::Replace($s, '(?s)\[\[(File|Image):[^\]]*\]\]', '')
  # Templates (a couple of passes for shallow nesting)
  for ($i = 0; $i -lt 3; $i++) { $s = [regex]::Replace($s, '\{\{[^{}]*\}\}', '') }
  # Wiki links [[a|b]] -> b, [[a]] -> a
  $s = [regex]::Replace($s, '\[\[[^\]|]*\|([^\]]+)\]\]', '$1')
  $s = [regex]::Replace($s, '\[\[([^\]]+)\]\]', '$1')
  # External links [http... label] -> label
  $s = [regex]::Replace($s, '\[https?:[^\s\]]+\s+([^\]]+)\]', '$1')
  $s = [regex]::Replace($s, '\[https?:[^\]]*\]', '')
  $s = $s -replace "'''", '' -replace "''", ''
  $s = [regex]::Replace($s, '<[^>]+>', '')
  $s = $s -replace '&nbsp;', ' '
  # Drop list markers and remaining table/markup lines
  $s = [regex]::Replace($s, '(?m)^[\*#:;|!].*$', '')
  $s = [regex]::Replace($s, '(?m)^\{\|.*$', '')
  $s = ($s -replace '\r', '')
  return $s
}

function First-Paragraph([string]$s, [int]$cap = 600) {
  $s = Clean-Text $s
  $paras = $s -split "`n`n"
  $buf = ""
  foreach ($p in $paras) {
    $t = ($p -replace '\s+', ' ').Trim()
    if ($t.Length -lt 40) { continue }
    if ($buf.Length -eq 0) { $buf = $t } else { $buf = "$buf $t" }
    if ($buf.Length -ge 200) { break }
  }
  if ($buf.Length -gt $cap) { $buf = $buf.Substring(0, $cap).TrimEnd() + "…" }
  return $buf.Trim()
}

# Extract the text under a level-2 == Section == up to the next level-2 header.
function Get-Section([string]$wt, [string]$title) {
  $pattern = '(?s)\n==\s*' + [regex]::Escape($title) + '\s*==\s*\n(.*?)(?=\n==[^=]|\Z)'
  $m = [regex]::Match($wt, $pattern)
  if ($m.Success) { return $m.Groups[1].Value }
  return ""
}
# Level-3 === Section === (e.g. Holidays under Understand)
function Get-SubSection([string]$wt, [string]$title) {
  $pattern = '(?s)\n===\s*' + [regex]::Escape($title) + '\s*===\s*\n(.*?)(?=\n==|\Z)'
  $m = [regex]::Match($wt, $pattern)
  if ($m.Success) { return $m.Groups[1].Value }
  return ""
}

function Save-Map { param($m, $path)
  $json = $m | ConvertTo-Json -Depth 5
  [System.IO.File]::WriteAllText($path, $json, (New-Object System.Text.UTF8Encoding($false)))
}

$done = 0
foreach ($name in $todo) {
  $enc = [uri]::EscapeDataString($name)
  $url = "https://en.wikivoyage.org/w/api.php?action=parse&page=$enc&prop=wikitext&format=json&redirects=1"
  $attempt = 0; $ok = $false
  while (-not $ok -and $attempt -lt 4) {
    $attempt++
    try {
      $resp = Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = 'VoyaraTravelGuide/1.0 (contact: demo@example.com)' } -TimeoutSec 60
      $wt = $resp.parse.wikitext.'*'
      $info = @{}
      if ($wt) {
        $info['understand'] = First-Paragraph (Get-Section $wt 'Understand') 700
        $info['getIn'] = First-Paragraph (Get-Section $wt 'Get in') 600
        $info['getAround'] = First-Paragraph (Get-Section $wt 'Get around') 600
        $info['talk'] = First-Paragraph (Get-Section $wt 'Talk') 500
        $info['buy'] = First-Paragraph (Get-Section $wt 'Buy') 600
        $info['eat'] = First-Paragraph (Get-Section $wt 'Eat') 500
        $info['staySafe'] = First-Paragraph (Get-Section $wt 'Stay safe') 600
        $info['stayHealthy'] = First-Paragraph (Get-Section $wt 'Stay healthy') 600
        $info['connect'] = First-Paragraph (Get-Section $wt 'Connect') 500
        $info['respect'] = First-Paragraph (Get-Section $wt 'Respect') 600
        $festivals = Get-SubSection $wt 'Holidays'
        if (-not $festivals) { $festivals = Get-SubSection $wt 'Festivals and events' }
        if (-not $festivals) { $festivals = Get-SubSection $wt 'Festivals' }
        $info['festivals'] = First-Paragraph $festivals 500
      }
      $clean = @{}
      foreach ($k in $info.Keys) { if ($info[$k] -and $info[$k].Length -gt 0) { $clean[$k] = $info[$k] } }
      $map[$name] = $clean
      $ok = $true
    } catch {
      $msg = $_.Exception.Message
      if ($msg -match '429') { Start-Sleep -Seconds (2 * $attempt) }
      elseif ($msg -match '404') { $map[$name] = @{}; $ok = $true }
      else { Start-Sleep -Milliseconds 500 }
    }
  }
  $done++
  if ($done % 40 -eq 0) { Save-Map $map $mapPath; Write-Output ("...{0} processed" -f $done) }
  Start-Sleep -Milliseconds 200
}

Save-Map $map $mapPath
$withData = ($map.Values | Where-Object { $_.Keys.Count -gt 0 }).Count
Write-Output ("done. countries with info: {0} / {1}" -f $withData, $map.Count)
