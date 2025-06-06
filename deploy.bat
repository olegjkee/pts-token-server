@echo off
echo 🚀 PTS Project Deploy Script
echo =============================
echo.

:menu
echo Выберите платформу для деплоя:
echo.
echo 1. Railway (Рекомендуемый - бесплатно)
echo 2. Vercel (Бесплатно)  
echo 3. Heroku (Платно)
echo 4. Создать Git репозиторий
echo 5. Выход
echo.
set /p choice="Введите номер (1-5): "

if "%choice%"=="1" goto railway
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto heroku
if "%choice%"=="4" goto git_setup
if "%choice%"=="5" goto exit
goto menu

:railway
echo.
echo 📡 Деплой на Railway...
echo.
echo 1. Перейдите на https://railway.app
echo 2. Войдите через GitHub
echo 3. Нажмите "New Project"
echo 4. Выберите "Deploy from GitHub repo"
echo 5. Выберите ваш репозиторий
echo.
pause
goto menu

:vercel
echo.
echo 🌐 Деплой на Vercel...
echo.
echo Устанавливаем Vercel CLI...
npm install -g vercel
echo.
echo Запускаем деплой...
vercel --prod
echo.
pause
goto menu

:heroku
echo.
echo 🔴 Деплой на Heroku...
echo.
echo Проверяем Heroku CLI...
heroku --version
if errorlevel 1 (
    echo Heroku CLI не установлен!
    echo Скачайте с: https://devcenter.heroku.com/articles/heroku-cli
    pause
    goto menu
)
echo.
set /p app_name="Введите имя приложения: "
heroku create %app_name%
git push heroku main
echo.
pause
goto menu

:git_setup
echo.
echo 📁 Настройка Git репозитория...
echo.
git init
git add .
git commit -m "Initial commit: PTS Token Server"
echo.
echo Репозиторий создан! Теперь:
echo 1. Создайте репозиторий на GitHub
echo 2. Выполните команды:
echo    git remote add origin ВАШ_URL_РЕПОЗИТОРИЯ
echo    git branch -M main
echo    git push -u origin main
echo.
pause
goto menu

:exit
echo.
echo 👋 До свидания!
pause
exit 