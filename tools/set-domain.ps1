# 買好自訂網域後執行一次,把全站的 DOMAIN_PLACEHOLDER 換成正式網域,並產生 CNAME 檔。
# 用法:powershell -ExecutionPolicy Bypass -File tools\set-domain.ps1 -Domain "example.com"
param(
  [Parameter(Mandatory = $true)][string]$Domain
)

$root = Split-Path $PSScriptRoot -Parent
$domain = $Domain.Trim().TrimEnd('/') -replace '^https?://', ''

$targets = Get-ChildItem $root -Recurse -File -Include *.html, *.xml, robots.txt |
  Where-Object { $_.FullName -notmatch '\\\.git\\' }

$changed = 0
foreach ($f in $targets) {
  $text = [System.IO.File]::ReadAllText($f.FullName)
  if ($text.Contains('DOMAIN_PLACEHOLDER')) {
    $text = $text.Replace('DOMAIN_PLACEHOLDER', $domain)
    [System.IO.File]::WriteAllText($f.FullName, $text, [System.Text.UTF8Encoding]::new($false))
    $changed++
    Write-Host "updated: $($f.FullName.Substring($root.Length + 1))"
  }
}

# GitHub Pages 自訂網域設定檔
[System.IO.File]::WriteAllText((Join-Path $root 'CNAME'), $domain + "`n", [System.Text.UTF8Encoding]::new($false))
Write-Host "updated: CNAME"

Write-Host ""
Write-Host "完成:$changed 個檔案已換成 https://$domain"
Write-Host "接下來:1) 到網域商設定 DNS(見 docs/SPEC.md);2) commit + push;3) 到 GitHub repo Settings → Pages 確認 Custom domain 與 Enforce HTTPS。"
