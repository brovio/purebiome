Add-Type -AssemblyName System.Drawing
$base = Join-Path $PSScriptRoot "..\images" | Resolve-Path

function Save-Png($name, $w, $h, $c1, $c2, $label) {
  $path = Join-Path $base $name
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $r = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($r, $c1, $c2, 90)
  $g.FillRectangle($brush, $r)
  $fs = [math]::Max(12, [int]($w / 35))
  $font = New-Object System.Drawing.Font("Segoe UI", $fs, [System.Drawing.FontStyle]::Bold)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = "Center"
  $sf.LineAlignment = "Center"
  $rect = [System.Drawing.RectangleF]::new(0, $h * 0.38, $w, $h * 0.25)
  $sum = $c1.R + $c1.G + $c1.B
  $brushText = if ($sum -lt 380) { [System.Drawing.Brushes]::White } else { [System.Drawing.Brushes]::DarkSlateGray }
  $g.DrawString($label, $font, $brushText, $rect, $sf)
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  Write-Host "Wrote $path"
}

Save-Png "hero-essential-studio.png" 1200 900 ([System.Drawing.Color]::FromArgb(255,252,247)) ([System.Drawing.Color]::FromArgb(230,238,233)) "PureBiome Essential"
Save-Png "range-essential-card.png" 800 1000 ([System.Drawing.Color]::FromArgb(250,248,244)) ([System.Drawing.Color]::FromArgb(228,235,230)) "Essential"
Save-Png "range-pro-card.png" 800 1000 ([System.Drawing.Color]::FromArgb(18,55,48)) ([System.Drawing.Color]::FromArgb(8,28,25)) "Pro"
Save-Png "photo-tub-neutral.png" 600 800 ([System.Drawing.Color]::FromArgb(255,255,255)) ([System.Drawing.Color]::FromArgb(236,245,238)) "Neutral"
Save-Png "photo-tub-berry.png" 600 800 ([System.Drawing.Color]::FromArgb(248,240,250)) ([System.Drawing.Color]::FromArgb(225,205,230)) "Berry"
Save-Png "photo-tub-orange.png" 600 800 ([System.Drawing.Color]::FromArgb(255,248,235)) ([System.Drawing.Color]::FromArgb(255,215,175)) "Orange"
Save-Png "photo-sachets.png" 600 800 ([System.Drawing.Color]::FromArgb(252,250,246)) ([System.Drawing.Color]::FromArgb(235,240,235)) "Sachets"
Save-Png "photo-tub-clean.png" 600 800 ([System.Drawing.Color]::FromArgb(250,252,250)) ([System.Drawing.Color]::FromArgb(218,232,225)) "Gut Health"

# JPG lineup
$path = Join-Path $base "photo-lineup-lifestyle.jpg"
$bmp = New-Object System.Drawing.Bitmap(1200, 700)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(235, 228, 218))
$bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$bmp.Dispose()
Write-Host "Wrote $path"
