// Установите адрес сервера, к которому будете делать запрос
const serverUrl = 'http://192.168.0.101:3000/';

// Получаем ссылку из ответа сервера и переходим по ней
function navigateToLink(link) {
	if (link) {
		window.location.href = link;
	} else {
		console.log('Сервер не вернул ссылку.');
	}
}

// Функция для выполнения HTTP-запроса
function makeHttpRequest(url, callback) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);
				callback(response.link);
			} else {
				console.log('Ошибка запроса:', xhr.statusText);
			}
		}
	};
	xhr.open('GET', url, true);
	xhr.send();
}
