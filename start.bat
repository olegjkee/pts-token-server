@echo off
echo 🚀 Запуск PTS Token Server...
echo.
echo ================================
echo  PTS PROJECT - TOKEN SERVER
echo ================================
echo.
echo 📍 Локальный доступ: http://localhost:3000
echo 🌐 Сетевой доступ: http://192.168.1.34:3000
echo.
echo 💡 Для глобального доступа используйте:
echo    ngrok http 3000
echo.
echo ⚠️  Нажмите Ctrl+C для остановки
echo.
node server.js
pause 