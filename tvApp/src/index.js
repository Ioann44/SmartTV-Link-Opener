// Установите адрес сервера, к которому будете делать запрос
const serverUrl = 'http://192.168.0.101:3000/';
// const serverUrl = 'http://192.168.0.66:3000/';

function getJson(urlSuff, callback) {
	fetch(serverUrl + urlSuff)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.status}`);
			}
			return response.json();
		})
		.then(data => { callback(data); })
		.catch(error => { console.error(error); })
}

// Получаем ссылку из ответа сервера и переходим по ней
function navigateToLink(linkJson) {
	if (linkJson.link) {
		window.location.href = linkJson.link;
	} else {
		console.log('Сервер не вернул ссылку.');
	}
}

// With open browser version
function navigateToLink_browser(linkJson) {
	if (linkJson.link)
		webOS.service.request("luna://com.webos.applicationManager", {
			method: "launch",
			parameters: {
				id: "com.webos.app.browser",
				params: {
					target: linkJson.link,
				},
			},
			onSuccess: (res) => {
				console.log("Browser open success. ", res);
			},
			onFailure: (res) => {
				console.log("Browser open fail. ", res);
			},
		});
}

function moveImage(directionJson) {
	if (directionJson.x || directionJson.y) {
		var image = document.getElementsByClassName("cat")[0];

		var rect = image.getBoundingClientRect();
		var currentXInVw = (rect.left / window.innerWidth) * 100;
		var currentYInVh = (rect.top / window.innerHeight) * 100;

		image.style.left = `${currentXInVw + directionJson.x}vw`;
		image.style.top += `${currentYInVh + directionJson.y}vh`;
	}
};

var intervalId = setInterval(() => { getJson("moveImage", moveImage) }, 20);
setTimeout(() => {
	clearInterval(intervalId);
	// getJson('', navigateToLink);
	// getJson('', navigateToLink_browser);
}, 6500)