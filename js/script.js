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
const concealedBtn = document.querySelector(".concealed-button");
const tileAmount = 13;
for (let i = 0; i < tileAmount; i++) {
	const span = document.createElement("span");
	span.classList.add("concealed-icon");
	concealedBtn.appendChild(span);
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
	const grid = document.querySelector(".tile-grid");
	const tileTypes = ["man", "sou", "pin", "character"];
	const typeCounts = [9, 9, 9, 7];

	tileTypes.forEach((type, index) => {
		const count = typeCounts[index];
		for (let i = 1; i <= count; i++) {
			let tileType = `${type}${i}`;

			const tile = document.createElement("div");
			tile.classList.add("tile");
			tile.setAttribute("data-tile-type", tileType);
			tile.style.backgroundImage = `url('/img/light/${tileType}.svg')`;
			grid.appendChild(tile);

			if (i === 5 && type != "character") {
				// add red 5 pin/man/sou
				tileType = `${type}5r`;
				const redTile = document.createElement("div");
				redTile.classList.add("tile");
				redTile.setAttribute("data-tile-type", tileType);
				redTile.style.backgroundImage = `url('/img/light/${tileType}.svg')`;
				grid.appendChild(redTile);
			}
			//todo
			// revamp - change to click => show in upper area instead of selection
			/*tile.addEventListener("click", function () {
				if (this.classList.contains("selected")) {
					this.classList.remove("selected");
				} else {
					if (countSelectedTiles() < 8) {
						this.classList.add("selected");
					} else {
						showPopupMessage("test hah");
					}
				}
			});*/
		}
	});
});

function showPopupMessage(text) {
	var popupMessage = document.getElementById("popupMessage");
	var messageText = popupMessage.querySelector(".popupMessageText");

	messageText.textContent = text ? text : "Error occurred";
	popupMessage.classList.add("popup-show");

	// remove the popup after the animations complete (3 seconds total)
	setTimeout(function () {
		popupMessage.classList.remove("popup-show");
	}, 3000);
}

//todo
//Calculate Button
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("calculateScore").addEventListener("click", function () {
		// todo
		// logic to calculate the score
		console.log("Calculate score for selected tiles");
		showPopupMessage("incomplete func");
	});
});
