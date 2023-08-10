const http = require('http');

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
  // Устанавливаем заголовки ответа
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Отправляем ответ клиенту
  res.end('Привет, это простой HTTP сервер на Node.js!');
});

// Указываем порт, на котором сервер будет слушать запросы
const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
