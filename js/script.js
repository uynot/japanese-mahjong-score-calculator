//spawn multiple concealed tile icon
const button = document.querySelector(".concealed-button");
const tileAmount = 13;
for (let i = 0; i < tileAmount; i++) {
	const span = document.createElement("span");
	span.classList.add("concealed-icon");
	button.appendChild(span);
}

//switch the color of active ron type button
// Initially set one button as active
const buttons = document.querySelectorAll(".toggle-ronTypeButton");
buttons.forEach((button) => {
	button.addEventListener("click", function () {
		buttons.forEach((btn) => btn.classList.remove("ronTypeButtonActive"));
		this.classList.add("ronTypeButtonActive");
	});
});
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("defaultRonTypeButton").classList.add("ronTypeButtonActive");
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
