//global var
/*
	todo - tiles icon amount depends on this global variable
*/
var chiPon = [
	[1, 2, 3],
	[2, 3, 4],
];
var kan = [];
var ankan = [];

/*
//verify tile type
function isValidType(type) {
	return tilesTypes.includes(type);
}

//verify kaze type
function isValidKaze(kaze) {
	return kazeTypes.includes(kaze);
}*/

//spawn multiple concealed tile as button icon
function generateBtnIcon() {
	const concealedBtn = document.querySelector(".concealed-button");
	var tileAmount = 13;
	var chiPonTiles = !chiPon ? 0 : chiPon.length * 3;
	console.log("chiPonTiles: " + chiPonTiles);
	var kanTiles = !kan ? 0 : kan.length * 3; // count 4 as 3
	console.log("kanTiles: " + kanTiles);
	var ankanTiles = !ankan ? 0 : ankan.length * 3; // count 4 as 3
	console.log("ankanTiles: " + ankanTiles);
	var revealedTiles = tileAmount - chiPonTiles - kanTiles - ankanTiles;
	for (let i = 0; i < revealedTiles; i++) {
		const span = document.createElement("span");
		span.classList.add("concealed-icon");
		concealedBtn.appendChild(span);
	}
	const tenpaiBtn = document.querySelector(".tenpai-button");
	for (let i = 0; i < revealedTiles; i++) {
		const span = document.createElement("span");
		span.classList.add("tenpaiHand-icon");
		tenpaiBtn.appendChild(span);
		if (i === revealedTiles - 1) {
			const lastSpan = document.createElement("span");
			lastSpan.classList.add("tenpai-icon");
			tenpaiBtn.appendChild(lastSpan);
		}
	}
}
generateBtnIcon();

//switch the color of active tile type button
//initially set one button as active
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
//initially set ton wind as active table wind
function setDefaultWind() {
	const tableWinds = document.querySelectorAll(".toggle-tableWind");
	tableWinds.forEach((wind) => {
		wind.addEventListener("click", function () {
			tableWinds.forEach((w) => w.classList.remove("activeTableWind"));
			this.classList.add("activeTableWind");
		});
	});
	document.getElementById("defaultTableWind").classList.add("activeTableWind");
}
//init
setDefaultWind();

//switch the color of active player wind type
//initially set ton wind as active player wind
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
//tsumo button event
document.getElementById("tsumoToggle").addEventListener("change", function () {
	const tsumoLabel = document.querySelector(".label-tsumo");

	if (this.checked) {
		//tsumoLabel.textContent = "Tsumo On";
		console.log("Tsumo: Yes");
	} else {
		//tsumoLabel.textContent = "Tsumo Off";
		console.log("Tsumo: No");
	}
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

//west round extension toggle
document.addEventListener("DOMContentLoaded", function () {
	var toggle = document.getElementById("westExtDisabled");
	var westWind = document.getElementById("westWind");

	toggle.addEventListener("change", function () {
		if (!this.checked) {
			westWind.classList.add("disabled");
			setDefaultWind();
		} else {
			westWind.classList.remove("disabled");
		}
	});
});
document.getElementById("westWind").classList.add("disabled");
