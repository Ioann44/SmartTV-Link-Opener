// Установите адрес сервера, к которому будете делать запрос
const serverUrl = 'http://192.168.0.101:3000/';

// Cover over fetch get request
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

// Log to the server console
function serverLog(message) {
	fetch(serverUrl + 'log', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ message: message })
	});
}

// With open browser version
function navigateToLink_browser() {
	if (link)
		webOS.service.request("luna://com.webos.applicationManager", {
			method: "launch",
			parameters: {
				id: "com.webos.app.browser",
				params: {
					target: link,
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

// Callback function to move cat image, not used now
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

// Move cat image
// var intervalId = setInterval(() => { getJson("moveImage", moveImage) }, 50);
// setTimeout(() => {
// 	clearInterval(intervalId);
// 	// getJson('getLink', navigateToLink_browser);
// }, 10000)

var link = 'https://github.com/Ioann44';

// Update current link field on the page every second
var linkDiv = document.getElementById("linkValue");
var linkInterval = setInterval(
	() => {
		getJson('getLink', (linkJson) => {
			this.link = linkJson.link;
			linkDiv.innerText = link;
		});
	},
	1000);

// Set hint where to find ui
document.getElementById('changeLinkPage').innerText = `To change the link, go to: ${serverUrl.match('^(?:https?://)?(.+$)')[1]}`;

// Set current TV ip of wifi once
// Possible to check for wired (res.wired) connection and do it several times (subscribe: true)
const ipHeader = document.getElementById('ipHeader');
webOSDev.connection.getStatus({
	onSuccess: function (res) {
		if (res.isInternetConnectionAvailable === true && res.wifi) {
			ipHeader.innerText = res.wifi.ipAddress;
		}
	},
	onFailure: function (res) {
		// API calling error
	},
	subscribe: false
});

// Handle OK keydown, necessary for remotes without pointing
document.addEventListener("keydown", (event) => {
	// serverLog(`KeyCode: ${event.keyCode}`);
	if (event.keyCode === 13) {
		navigateToLink_browser();
	}
});
