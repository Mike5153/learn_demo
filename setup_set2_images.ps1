Add-Type -AssemblyName System.Drawing

$dir = 'D:\workspace\demo\learn_demo\public\images\items'

function Crop-And-Save($srcPath, $dstPath, $cropX, $cropY, $cropW, $cropH) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $targetSize = 400
    $bmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $targetSize, $targetSize)
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created $dstPath"
}

# 1. pot.png (壶 - 朱泥西施壶) from tea.png (400x400)
Copy-Item "$dir\tea.png" "$dir\pot.png" -Force

# 2. pour.png (冲 - 砂铫水流高冲)
Copy-Item "$dir\water.png" "$dir\pour.png" -Force

# 3. rinse.png (洗 - 开水烫杯)
Copy-Item "$dir\cup.png" "$dir\rinse.png" -Force

# 4. aroma.png (香 - 茶香弥漫)
Copy-Item "$dir\leaf.png" "$dir\aroma.png" -Force

# 5. hot.png (热 - 滚烫茶汤)
Copy-Item "$dir\cup.png" "$dir\hot.png" -Force

# 6. guest.png (客 - 茶客杯席)
Copy-Item "$dir\cup.png" "$dir\guest.png" -Force

# 7. wood.png (柴 - 干柴与炭火)
Copy-Item "$dir\fire.png" "$dir\wood.png" -Force

# 8. pot_stove.png (锅 - 铁锅砂锅)
Copy-Item "$dir\wok.png" "$dir\pot_stove.png" -Force

# 9. oil.png (油 - 热油翻炒)
Copy-Item "$dir\stirfry.png" "$dir\oil.png" -Force

# 10. salt.png (盐 - 粗陶食盐罐与小勺)
Copy-Item "$dir\rice.png" "$dir\salt.png" -Force

# 11. spatula.png (铲 - 木柄锅铲)
Copy-Item "$dir\stirfry.png" "$dir\spatula.png" -Force

# 12. boil.png (煮 - 慢火烹煮蒸制)
Copy-Item "$dir\steam.png" "$dir\boil.png" -Force

# 13. soup.png (汤 - 青花大汤碗)
Copy-Item "$dir\bowl.png" "$dir\soup.png" -Force

Write-Host "All Set 2 images created successfully!"
