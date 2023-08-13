const express = require('express');
fs = require('fs');
const app = express();

// Need to be placed before "get" connectors, ar first init as least
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ всем источникам
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешенные методы запросов
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешенные заголовки
    next();
});
// Set path with static assets
app.use(express.static('public'));
// Set json middleware
app.use(express.json());

var link = 'https://github.com/Ioann44';

// Entry point of UI to change link
app.get('/', (req, res) => {
    fs.readFile('./pages/index.html', 'utf8', (err, content) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(content);
    });
})

// Update link on the server
app.post('/', (req, res) => {
    if (!req.body.newLink) {
        res.status(406).send('Link must be not empty');
        return;
    }
    link = req.body.newLink;
    res.send('Data received successfully');
});

// Get link, stored on the server
app.get('/getLink', (req, res) => {
    res.json({ link: link });
});

// Get move direction for cat image, not used now
app.get('/moveImage/', (req, res) => {
    res.json({ x: 0.2, y: 0 });
});

// Log to the server console
app.post('/log', (req, res) => {
    if (!req.body.message) {
        console.log("Empty log message");
        res.status(406).send('Message must be not empty');
        return;
    }
    console.log(req.body.message);
    res.send('Data received successfully');
});

// Startup server on port 3000
app.listen(3000, '0.0.0.0', () => {
    console.log('Сервер запущен на порту 3000');
});