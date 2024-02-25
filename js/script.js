//global var

//verify tile type
function isValidType(type) {
	return tilesTypes.includes(type);
}

//verify kaze type
function isValidKaze(kaze) {
	return kazeTypes.includes(kaze);
}

//spawn multiple concealed tile as button icon
const button = document.querySelector(".concealed-button");
const tileAmount = 13;
for (let i = 0; i < tileAmount; i++) {
	const span = document.createElement("span");
	span.classList.add("concealed-icon");
	button.appendChild(span);
}

//switch the color of active tile type button
// Initially set one button as active
const buttons = document.querySelectorAll(".toggle-tileType");
buttons.forEach((button) => {
	button.addEventListener("click", function () {
		buttons.forEach((btn) => btn.classList.remove("activeTileType"));
		this.classList.add("activeTileType");
	});
});
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("defaultTileType").classList.add("activeTileType");
});

//switch the color of active table wind type
// Initially set ton wind as active table wind
const tableWinds = document.querySelectorAll(".toggle-tableWind");
tableWinds.forEach((wind) => {
	wind.addEventListener("click", function () {
		tableWinds.forEach((w) => w.classList.remove("activeTableWind"));
		this.classList.add("activeTableWind");
	});
});
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("defaultTableWind").classList.add("activeTableWind");
});

//switch the color of active player wind type
// Initially set ton wind as active player wind
const playerWinds = document.querySelectorAll(".toggle-playerWind");
playerWinds.forEach((wind) => {
	wind.addEventListener("click", function () {
		playerWinds.forEach((w) => w.classList.remove("activePlayerWind"));
		this.classList.add("activePlayerWind");
	});
});
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("defaultPlayerWind").classList.add("activePlayerWind");
});

//todo
//tiles grid
document.addEventListener("DOMContentLoaded", function () {
	const grid9x3 = document.querySelector(".dora-tile-grid");
	const tileTypes = ["man", "sou", "pin", "character"];
	const typeCounts = [9, 9, 9, 7]; // Number of tiles for each type

	function countSelectedTiles() {
		return document.querySelectorAll(".tile.selected").length;
	}

	tileTypes.forEach((type, index) => {
		const count = typeCounts[index]; // Get the count for this type
		const container = count === 3 ? grid7x1 : grid9x3; // Choose the container based on count
		for (let i = 1; i <= count; i++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			tile.setAttribute("data-tile-type", `${type}${i}`); // Set the data attribute for tile type and number
			tile.style.backgroundImage = `url('/img/light/${type}${i}.svg')`; // Set the background image path
			tile.addEventListener("click", function () {
				if (this.classList.contains("selected")) {
					this.classList.remove("selected");
				} else {
					if (countSelectedTiles() < 8) {
						this.classList.add("selected");
					} else {
						showPopupMessage("test hah");
					}
				}
			});
			container.appendChild(tile);
		}
	});
});

function showPopupMessage(text) {
	var popupMessage = document.getElementById("popupMessage");
	var messageText = popupMessage.querySelector(".popupMessageText");

	messageText.textContent = text ? text : "Error occurred";
	popupMessage.classList.add("popup-show");

	// Remove the popup after the animations complete (3 seconds total)
	setTimeout(function () {
		popupMessage.classList.remove("popup-show");
	}, 3000);
}

//	todo
//Calculate Button
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("calculateScore").addEventListener("click", function () {
		// Logic to calculate the score
		console.log("Calculate score for selected tiles");
		showPopupMessage("incomplete func");
	});
});
