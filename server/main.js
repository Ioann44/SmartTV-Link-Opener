const express = require('express');
const app = express();

// Need to be placed before "get" connectors, ar first init as least
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ всем источникам
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешенные методы запросов
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешенные заголовки
    next();
});
// Get link
app.get('/', (req, res) => {
    res.json({ link: 'https://github.com/Ioann44' });
});

// Get move direction
app.get('/moveImage/', (req, res) => {
    res.json({ x: 1, y: 0 });
});


// Слушаем порт 3000
app.listen(3000, '0.0.0.0', () => {
	console.log('Сервер запущен на порту 3000');
});