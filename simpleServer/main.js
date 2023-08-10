const express = require('express');
const app = express();

// Обработчик GET запроса
app.get('/', (req, res) => {
	res.json({ link: 'https://regex101.com/' });
});

// Слушаем порт 3000
// app.listen(3000, '0.0.0.0', () => {
app.listen(3000, '192.168.0.101', () => {
	console.log('Сервер запущен на порту 3000');
});