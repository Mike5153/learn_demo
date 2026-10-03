Add-Type -AssemblyName System.Drawing

$brain = 'C:\Users\mike\.gemini\antigravity-cli\brain\9dff9383-7d17-47c0-9250-943cf0fac9a6'
$dest = 'D:\workspace\demo\learn_demo\public\images\items'

Copy-Item "$brain\item_tray_1790769627423.jpg" "$dest\tray.jpg" -Force

# Process tray.jpg to tray.png with transparent background
function Remove-WhiteBg($srcPath, $dstPath) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $targetSize = 400
    $bmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($src, 0, 0, $targetSize, $targetSize)
    $g.Dispose()
    $src.Dispose()

    $w = $bmp.Width
    $h = $bmp.Height
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $stride = $bmpData.Stride
    $bytes = New-Object byte[] ($stride * $h)
    [System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $bytes, 0, $bytes.Length)

    $visited = New-Object bool[] ($w * $h)
    $queue = New-Object System.Collections.Generic.Queue[int]

    for ($x = 0; $x -lt $w; $x++) {
        $idxTop = (0 * $stride) + ($x * 4)
        if ($bytes[$idxTop] -ge 232 -and $bytes[$idxTop + 1] -ge 232 -and $bytes[$idxTop + 2] -ge 232) {
            $pIdx = 0 * $w + $x
            $visited[$pIdx] = $true
            $queue.Enqueue($pIdx)
        }
        $idxBot = (($h - 1) * $stride) + ($x * 4)
        if ($bytes[$idxBot] -ge 232 -and $bytes[$idxBot + 1] -ge 232 -and $bytes[$idxBot + 2] -ge 232) {
            $pIdx = ($h - 1) * $w + $x
            $visited[$pIdx] = $true
            $queue.Enqueue($pIdx)
        }
    }

    for ($y = 0; $y -lt $h; $y++) {
        $idxLeft = ($y * $stride) + (0 * 4)
        if ($bytes[$idxLeft] -ge 232 -and $bytes[$idxLeft + 1] -ge 232 -and $bytes[$idxLeft + 2] -ge 232) {
            $pIdx = $y * $w + 0
            if (-not $visited[$pIdx]) {
                $visited[$pIdx] = $true
                $queue.Enqueue($pIdx)
            }
        }
        $idxRight = ($y * $stride) + (($w - 1) * 4)
        if ($bytes[$idxRight] -ge 232 -and $bytes[$idxRight + 1] -ge 232 -and $bytes[$idxRight + 2] -ge 232) {
            $pIdx = $y * $w + ($w - 1)
            if (-not $visited[$pIdx]) {
                $visited[$pIdx] = $true
                $queue.Enqueue($pIdx)
            }
        }
    }

    $dx = @(1, -1, 0, 0)
    $dy = @(0, 0, 1, -1)

    while ($queue.Count -gt 0) {
        $curr = $queue.Dequeue()
        $cx = $curr % $w
        $cy = [Math]::Floor($curr / $w)

        $offset = ($cy * $stride) + ($cx * 4)
        $bytes[$offset + 3] = 0

        for ($i = 0; $i -lt 4; $i++) {
            $nx = $cx + $dx[$i]
            $ny = $cy + $dy[$i]
            if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                $nIdx = $ny * $w + $nx
                if (-not $visited[$nIdx]) {
                    $nOffset = ($ny * $stride) + ($nx * 4)
                    $b = $bytes[$nOffset]
                    $g_val = $bytes[$nOffset + 1]
                    $r = $bytes[$nOffset + 2]
                    
                    if ($r -ge 230 -and $g_val -ge 230 -and $b -ge 230) {
                        $visited[$nIdx] = $true
                        $queue.Enqueue($nIdx)
                    } elseif ($r -ge 210 -and $g_val -ge 210 -and $b -ge 210) {
                        $visited[$nIdx] = $true
                        $minVal = [Math]::Min($r, [Math]::Min($g_val, $b))
                        $alpha = [byte](255 * (230 - $minVal) / 20)
                        if ($alpha -lt $bytes[$nOffset + 3]) {
                            $bytes[$nOffset + 3] = $alpha
                        }
                    }
                }
            }
        }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $bmpData.Scan0, $bytes.Length)
    $bmp.UnlockBits($bmpData)
    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated tray.png"
}

Remove-WhiteBg "$dest\tray.jpg" "$dest\tray.png"
