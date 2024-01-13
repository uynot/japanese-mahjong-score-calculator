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
