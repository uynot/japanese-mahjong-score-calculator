//global var

//verify tile type
function isValidType(type) {
	return tilesTypes.includes(type);
}

//verify kaze type
function isValidKaze(kaze) {
	return kazeTypes.includes(kaze);
}

//spawn multiple concealed tile icon
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
	const tileContainer = document.getElementById("mahjongTiles");
	for (let i = 0; i < 16; i++) {
		// Adjust the number of tiles as needed
		const tile = document.createElement("div");
		tile.classList.add("tile");
		tile.innerText = i + 1; // Placeholder for tile number
		tile.addEventListener("click", function () {
			this.classList.toggle("selected");
		});
		tileContainer.appendChild(tile);
	}

	document.getElementById("calculateScore").addEventListener("click", function () {
		// Logic to calculate the score
		console.log("Calculate score for selected tiles");
	});
});
