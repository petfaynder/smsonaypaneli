# MySQL'i başlat
Write-Host "MySQL sunucusu başlatılıyor..." -ForegroundColor Green
Start-Process -FilePath "C:\xampp\mysql\bin\mysqld.exe" -ArgumentList "--defaults-file=C:\xampp\mysql\bin\my.ini" -NoNewWindow

# MySQL'in başlaması için bekle
Write-Host "MySQL sunucusunun başlaması bekleniyor..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Prisma migration'ı çalıştır
Write-Host "Prisma migration çalıştırılıyor..." -ForegroundColor Green
npx prisma migrate dev

Write-Host "İşlem tamamlandı!" -ForegroundColor Green 