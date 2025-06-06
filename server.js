const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Пароль для админ-панели (можно изменить)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123PTS';

// Middleware для обработки JSON
app.use(express.json());
app.use(express.static(__dirname)); // Для статических файлов

let currentToken = { name: 'GMGN Token', contract: 'Ey59PH7Z4BFU4HjyKnyMdWt5GGN76KazTAwQihoUXRnk' };
let nextToken = null; // Токен, который заменит текущий по таймеру
let nextUpdateTime = Date.now() + (2 * 60 * 60 * 1000); // Время следующего обновления

// Функция проверки пароля
function checkAdminAuth(req, res, next) {
    const password = req.headers['x-admin-password'] || req.body.password;
    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, error: 'Неверный пароль' });
    }
    next();
}

// Функция смены токена по таймеру
function switchToNextToken() {
    if (nextToken) {
        currentToken = { ...nextToken };
        nextToken = null; // Очищаем следующий токен после замены
        console.log(`Токен автоматически заменен на: ${currentToken.contract}`);
    } else {
        console.log('Следующий токен не установлен, текущий остается');
    }
    nextUpdateTime = Date.now() + (2 * 60 * 60 * 1000); // Сброс таймера на 2 часа
}

// Проверка таймера каждую минуту
setInterval(() => {
    if (Date.now() >= nextUpdateTime) {
        switchToNextToken();
    }
}, 60 * 1000);

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/token', (req, res) => {
    console.log('Запрос токена:', currentToken);
    res.json(currentToken);
});

app.get('/admin-status', checkAdminAuth, (req, res) => {
    const status = { 
        currentToken, 
        nextToken, 
        nextUpdateTime,
        timeLeft: nextUpdateTime - Date.now()
    };
    console.log('Статус админки:', status);
    res.json(status);
});

// Эндпоинт для проверки пароля
app.post('/admin-login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, message: 'Доступ разрешен' });
    } else {
        res.status(401).json({ success: false, error: 'Неверный пароль' });
    }
});

app.post('/set-next-token', checkAdminAuth, (req, res) => {
    console.log('Получен запрос set-next-token:', req.body);
    const { contract, name } = req.body;
    
    if (!contract) {
        return res.status(400).json({ success: false, error: 'Contract required' });
    }
    
    nextToken = { name: name || 'Custom Token', contract };
    console.log('Следующий токен установлен:', nextToken);
    res.json({ success: true, nextToken });
});

app.post('/switch-now', checkAdminAuth, (req, res) => {
    console.log('Запрос немедленной смены токена');
    if (nextToken) {
        switchToNextToken();
        res.json({ success: true, currentToken });
    } else {
        res.json({ success: false, error: 'No next token set' });
    }
});

app.post('/reset-timer', checkAdminAuth, (req, res) => {
    console.log('Сброс таймера');
    nextUpdateTime = Date.now() + (2 * 60 * 60 * 1000);
    res.json({ success: true, nextUpdateTime });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
    console.log(`🌐 Доступен в локальной сети на http://[YOUR_IP]:${port}`);
    console.log(`Текущий токен: ${currentToken.name} - ${currentToken.contract}`);
});
