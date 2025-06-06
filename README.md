# 🚀 PTS Token Project

Сайт для отображения случайных токенов с админ-панелью управления.

## 📋 Возможности

- 🎯 Отображение текущего токена
- ⏰ Автоматическая смена токенов по таймеру
- 🔧 Админ-панель для управления
- 📱 Адаптивный дизайн
- ✨ Красивые анимации

## 🛠️ Установка

1. Убедитесь что установлен Node.js
2. Установите зависимости: `npm install express`
3. Запустите сервер: `node server.js` или `start.bat`

## 🌐 Способы запуска

### 1️⃣ Локальный доступ
```bash
node server.js
```
Доступ: http://localhost:3000

### 2️⃣ Доступ в локальной сети
Сервер уже настроен для доступа из сети по адресу:
http://192.168.1.34:3000

### 3️⃣ Глобальный доступ через ngrok
```bash
ngrok http 3000
```
Получите публичную ссылку для доступа из интернета.

### 4️⃣ Быстрый запуск
Просто запустите `start.bat` - все настроено автоматически!

## 🔧 Админ-панель

1. Нажмите кнопку ⚙️ в правом верхнем углу
2. **Set Next Token** - установите следующий токен
3. **Switch Now** - мгновенная смена токена
4. **Reset Timer** - сброс таймера на 2 часа

## 📡 API Endpoints

- `GET /token` - получить текущий токен
- `GET /admin-status` - статус админки
- `POST /set-next-token` - установить следующий токен
- `POST /switch-now` - переключить токен сейчас
- `POST /reset-timer` - сбросить таймер

## 🎨 Особенности дизайна

- Анимированный градиентный фон
- Плавающие частицы и орбы
- Пульсирующие эффекты
- Стеклянная морфология
- Автоадаптация под производительность устройства

## 📱 Мобильная поддержка

Сайт полностью адаптирован для мобильных устройств с оптимизацией производительности.

---

© 2024 PTS Project 