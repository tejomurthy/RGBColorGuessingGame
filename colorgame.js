var clickedColor = "";
var pickedColor = "";
var colorArr = [] 

var messageDisplay = document.querySelector("#messagedisplay");
var colorToDisplay = document.querySelector("#headColor");
var modeButtons = document.querySelectorAll(".mode");
var resetButton = document.querySelector("#reset");
var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");


init();

function init() {

	addModeListeners();
	addResetButtonListeners();
	setupSquares();
	//Call reset for the first time...
	reset(document.querySelector(".mode.selected").textContent);
}

function addModeListeners() {
	
	// Add listener to Easy/Hard/Fiendish buttons
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",function(){
			for(var j = 0; j < modeButtons.length; j++) {
				modeButtons[j].classList.remove("selected");
			}
			this.classList.add("selected");
			reset(this.textContent);
		});
	}
}

function addResetButtonListeners() {
	//Add reset button listeners
	resetButton.addEventListener("click",function(){
		reset(document.querySelector(".mode.selected").textContent);
	});
}

function setupSquares() {
		//Add click listeners to the squares

	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click",function() {
			if (pickedColor === this.style.backgroundColor) {
				changeSquaresTo(pickedColor);
				messageDisplay.textContent = "Correct!"
				resetButton.textContent = "Play again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again."
			}
			
		});
	}	
}

function reset(mode) {
	//Show the required number of squares with random colors
	for (var i = 0; i < numberOfColors(mode); i++) {
		squares[i].style.backgroundColor = generateRGB();
		squares[i].style.display = "block"
	}

	// Hide the remaining squares (if any)
	while (i < squares.length) {
		squares[i].style.display = "none"
		i++;
	} 

	// Randomly pick a colour chosen
	pickedColor = squares[Math.floor(Math.random() * numberOfColors(mode))].style.backgroundColor;

	// Show the color in the H1 for users to guess
	colorToDisplay.textContent = pickedColor;
	
	// Reset the background of H1 to steelblue (default)
	h1.style.backgroundColor = "steelblue";

	//Let the Reset Button show the "New Colors" text
	resetButton.textContent = "New Colors";	

	// Also messageDisplay needs to be blank initially
	messagedisplay.textContent = "";	

}

//Generates a random RGB
function generateRGB() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b  + ")";
}

// decides  number of colours based on a mode...
function numberOfColors(mode) {
	return mode === "Easy" ? 3 : mode === "Hard" ? 9 : 6;
}

// 
function changeSquaresTo(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	//Also set the background of h1 to the correctly guessed color
	h1.style.backgroundColor = color;	
}

