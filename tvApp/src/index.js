// Установите адрес сервера, к которому будете делать запрос
const serverUrl = 'http://192.168.0.101:3000/';

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

// With open browser version
function navigateToLink_browser() {
	if (link)
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

var intervalId = setInterval(() => { getJson("moveImage", moveImage) }, 50);
setTimeout(() => {
	clearInterval(intervalId);
	// getJson('getLink', navigateToLink_browser);
}, 10000)

var link = 'https://github.com/Ioann44';

var linkDiv = document.getElementById("linkValue");
var linkInterval = setInterval(
	() => {
		getJson('getLink', (linkJson) => {
			this.link = linkJson.link;
			linkDiv.innerText = link;
		});
	},
	1000);

var ipConfig = webOS.service.network.getNetworkSettings();
var ipAddress = ipConfig.wifi.ipv4;
document.getElementById('ipHeader') = ipHeader.innerText = ipAddress;