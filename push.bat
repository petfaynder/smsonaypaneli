@echo off
echo Git Push Script
echo ===============

git add .
git commit -m "Otomatik güncelleme: %date% %time%"
git push

echo.
echo Push tamamlandı!
pause 