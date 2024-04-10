//init global var
var popupTimeout;
var zeroHonbaTimeout;
var zeroOtherRiichiTimeout;
var activeTableWind = 0;
var westEnabled = false;

//calucation global var
//todo - make sure all global var is unique
/*
	todo - make all global var into a object and fix relevant func
*/
var chiPon = [
	// [1, 2, 3],
	// [2, 3, 4],
	// [1, 2, 3],
	// [2, 3, 4],
];
var kan = [];
var ankan = [];
var honba = 0;
var otherRiichi = 0;

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
	// var revealedTiles = tileAmount - chiPonTiles - kanTiles - ankanTiles;
	var revealedTiles = 13;
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
let buttons = document.querySelectorAll(".toggle-tileType");
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
const tableWinds = document.querySelectorAll(".toggle-tableWind");
tableWinds.forEach((wind) => {
	wind.addEventListener("click", function () {
		tableWinds.forEach((w) => w.classList.remove("activeTableWind"));
		this.classList.add("activeTableWind");

		//avoid wind changed after user turn off West Round Extension button
		let container = document.querySelector(".flex-item-tableWind");
		let tiles = Array.from(container.querySelectorAll(".kazeTile"));
		let activeElement = container.querySelector(".activeTableWind");
		let index = tiles.indexOf(activeElement);
		if (index === 0) {
			activeTableWind = 0;
			westEnabled = false;
		} else if (index === 1) {
			activeTableWind = 1;
			westEnabled = false;
		} else if (index === 2) {
			activeTableWind = 0;
			westEnabled = true;
		} else {
			showPopupMessage("Error occurred. Please refresh the page");
		}
	});
});
document.getElementById("defaultTableWind").classList.add("activeTableWind");

function setDefaultWind() {
	let winds = document.getElementsByClassName("toggle-tableWind").length;
	for (let i = 0; i < winds; i++) {
		document.getElementsByClassName("toggle-tableWind")[i].classList.remove("activeTableWind");
	}
	document.getElementsByClassName("toggle-tableWind")[activeTableWind].classList.add("activeTableWind");
}
//init
setDefaultWind();

//west round extension toggle
document.addEventListener("DOMContentLoaded", function () {
	var toggle = document.getElementById("westExtToggle");
	var westWind = document.getElementById("westWind");

	toggle.addEventListener("change", function () {
		if (!this.checked && westEnabled) {
			setDefaultWind();
			westWind.classList.add("disabled");

			let westWindButton = document.getElementById("westWind");
			westWindButton.classList.add("shake");
			setTimeout(() => {
				westWindButton.classList.remove("shake");
			}, 1000);
			westEnabled = false;
		} else if (!this.checked && activeTableWind != 2) {
			westWind.classList.add("disabled");
			setDefaultWind();
		} else {
			westWind.classList.remove("disabled");
			setDefaultWind();
		}
	});
});
document.getElementById("westWind").classList.add("disabled");

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
//riichi toggle event
document.getElementById("riichiToggle").addEventListener("change", function () {
	const riichiLabel = document.querySelector(".label-riichi");
	if (this.checked) {
		//riichiLabel.textContent = "Riichi On";
		console.log("Riichi: Yes");
	} else {
		//riichiLabel.textContent = "Riichi Off";
		console.log("Riichi: No");

		const chiPonBtn = document.querySelectorAll(".chiPonBtn");
		const kanBtn = document.querySelectorAll(".kanBtn");

		function removeActiveTileType(elements) {
			elements.forEach((element) => {
				if (element.classList.contains("activeTileType")) {
					element.classList.remove("activeTileType");
				}
			});
		}
		removeActiveTileType(chiPonBtn);
		removeActiveTileType(kanBtn);

		const defaultTileType = document.querySelector(".defaultTileType");
		if (defaultTileType) {
			defaultTileType.classList.add("activeTileType");
		}
	}
});

//todo - remove tiles in display bar with chi/pon/kan
//disable ura dora options in riichi mode
document.addEventListener("DOMContentLoaded", function () {
	const riichiToggle = document.getElementById("riichiToggle");
	const ippatsuToggle = document.getElementById("ippatsuToggle");
	const uraDoraBtn = document.getElementById("uraDoraBtn");
	const chiPonBtn = document.getElementById("chiPonBtn");
	const kanBtn = document.getElementById("kanBtn");
	const ippatsuSection = document.getElementById("ippatsu");

	function disableUraDoraDisplay(isDisable) {
		var uraDoraIdList = ["uraDora", "uraDora1", "uraDora2", "uraDora3", "uraDora4"];
		const flippedTiles = document.querySelectorAll(".tile-flipped");

		flippedTiles.forEach((div) => {
			if (uraDoraIdList.includes(div.id)) {
				if (isDisable) {
					div.classList.remove("disabled");
				} else {
					div.classList.add("disabled");
				}
			}
		});
	}

	riichiToggle.addEventListener("change", function () {
		if (this.checked) {
			disableUraDoraDisplay(true);

			//todo - remove chi/pon/kan in display bar
			uraDoraBtn.classList.remove("disabled");
			ippatsuSection.classList.remove("disabled");
			chiPonBtn.classList.add("disabled");
			kanBtn.classList.add("disabled");
		} else {
			//todo - remove all selected ura dora in second line display bar
			disableUraDoraDisplay(false);
			ippatsuToggle.checked = false;

			uraDoraBtn.classList.add("disabled");
			ippatsuSection.classList.add("disabled");
			chiPonBtn.classList.remove("disabled");
			kanBtn.classList.remove("disabled");
		}
	});
});

//todo
//ippatsu button event
document.getElementById("ippatsuToggle").addEventListener("change", function () {
	const ippatsuLabel = document.querySelector(".label-ippatsu");

	if (this.checked) {
		//ippatsuLabel.textContent = "Tsumo On";
		console.log("Ippatsu: Yes");
	} else {
		//ippatsuLabel.textContent = "Tsumo Off";
		console.log("Ippatsu: No");
	}
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

function triggerShakeAnimation(isHonba) {
	if (isHonba) {
		let honbaLabel = document.getElementById("honbaTimes");
		honbaLabel.classList.remove("shake");
		void honbaLabel.offsetWidth;
		honbaLabel.classList.add("shake");

		clearTimeout(zeroHonbaTimeout);
		zeroHonbaTimeout = setTimeout(() => {
			honbaLabel.classList.remove("shake");
		}, 1000);
	} else {
		let otherRiichiPLabel = document.getElementById("otherRiichiTimes");
		otherRiichiPLabel.classList.remove("shake");
		void otherRiichiPLabel.offsetWidth;
		otherRiichiPLabel.classList.add("shake");

		clearTimeout(zeroOtherRiichiTimeout);
		zeroOtherRiichiTimeout = setTimeout(() => {
			otherRiichiPLabel.classList.remove("shake");
		}, 1000);
	}
}

//todo	rinshan event
//todo	chankan event
//todo	haite event
//todo	houte event

//honba & otherRiichi +- click event
document.addEventListener("DOMContentLoaded", function () {
	function updateLabel(delta, isHonba) {
		if (isHonba) {
			var honbaLabel = document.querySelector(".label-honbaTimes");
			var currentHonba = parseInt(honbaLabel.textContent.split("x")[1]) || 0;
			var newHonba = currentHonba + delta;

			if (newHonba < 0) {
				newHonba = 0;
				triggerShakeAnimation(true);
			} else if (newHonba > 99) {
				newHonba = 99;
				triggerShakeAnimation(true);
				//showPopupMessage("Honba must be less than 99");
			} else {
				document.getElementById("honbaTimes").textContent = " x " + newHonba;
			}
			honba = newHonba;
		} else {
			var otherRiichiPlayer = document.querySelector(".label-otherRiichiTimes");
			var currentOtherRiichi = parseInt(otherRiichiPlayer.textContent.split("x")[1]) || 0;
			var newOtherRiichi = currentOtherRiichi + delta;

			if (newOtherRiichi < 0) {
				newOtherRiichi = 0;
				triggerShakeAnimation(false);
			} else if (newOtherRiichi > 3) {
				newOtherRiichi = 3;
				triggerShakeAnimation(false);
				//showPopupMessage("Honba must be less than 3");
			} else {
				document.getElementById("otherRiichiTimes").textContent = " x " + newOtherRiichi;
			}
			otherRiichi = newOtherRiichi;
		}
	}

	var honbaAddButton = document.querySelector(".honbaAdd .honbaAdjustBtn");
	honbaAddButton.addEventListener("click", function () {
		updateLabel(1, true);
	});

	var honbaDropButton = document.querySelector(".honbaDrop .honbaAdjustBtn");
	honbaDropButton.addEventListener("click", function () {
		updateLabel(-1, true);
	});

	var honbaResetButton = document.querySelector(".honbaReset .honbaAdjustBtn");
	honbaResetButton.addEventListener("click", function () {
		var honbaLabel = document.querySelector(".label-honbaTimes");
		var currentHonba = parseInt(honbaLabel.textContent.split("x")[1]) || 0;

		if (currentHonba != 0) {
			updateLabel(-honba, true);
		} else {
			triggerShakeAnimation(true);
		}
	});

	var otherRiichiPlayerAddButton = document.querySelector(".otherRiichiAdd .otherRiichiAdjustBtn");
	otherRiichiPlayerAddButton.addEventListener("click", function () {
		updateLabel(1, false);
	});

	var otherRiichiDropButton = document.querySelector(".otherRiichiDrop .otherRiichiAdjustBtn");
	otherRiichiDropButton.addEventListener("click", function () {
		updateLabel(-1, false);
	});

	var otherRiichiResetButton = document.querySelector(".otherRiichiReset .otherRiichiAdjustBtn");
	otherRiichiResetButton.addEventListener("click", function () {
		var otherRiichiLabel = document.querySelector(".label-otherRiichiTimes");
		var currentOtherRiichi = parseInt(otherRiichiLabel.textContent.split("x")[1]) || 0;

		if (currentOtherRiichi != 0) {
			updateLabel(-otherRiichi, false);
		} else {
			triggerShakeAnimation(false);
		}
	});
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
			// revamp - change to click => show in upper display bar instead of selection
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

	messageText.textContent = text || "Error occurred: text content not found";

	clearTimeout(popupTimeout);

	popupMessage.classList.remove("popup-show");
	void popupMessage.offsetWidth;

	popupMessage.classList.add("popup-show");

	popupTimeout = setTimeout(function () {
		popupMessage.classList.remove("popup-show");
	}, 3000);
}

//todo
//Calculate Button
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("calculateBtn").addEventListener("click", function () {
		console.log("Calculate Button clicked");
		showPopupMessage("incomplete func");

		// todo
		// logic to calculate the score:
		// check if riichi = true, did user choose any ura dora?
		// check if !riichi, is ippatsu checked?, shouldn't be checked
		// check if !riichi, is there any unnecessary ura dora
		// check !west ext = no west round
		// if else + isTenpai();
	});

	document.getElementById("resetBtn").addEventListener("click", function () {
		console.log("Reset Button clicked");
		showPopupMessage("incomplete func");

		// todo
		// logic to reset the options
	});

	document.getElementById("helpBtn").addEventListener("click", function () {
		console.log("Help Button clicked");
		showPopupMessage("incomplete func");

		// todo
		// highlight some area and shows guideline step by step
	});
});

//may useful in calculate func
/*
//verify tile type
function isValidType(type) {
	return tilesTypes.includes(type);
}

//verify kaze type
function isValidKaze(kaze) {
	return kazeTypes.includes(kaze);
}*/
