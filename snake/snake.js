function getDims() {
	var width = document.getElementById('w').value;
	var height = document.getElementById('h').value;
	return [width, height];
}

function initAudio() {
	context = new window.AudioContext(); // Set up audio system
	osc = context.createOscillator();
	gainNode = context.createGain();
	gainNode.connect(context.destination);
	osc.connect(gainNode);
	osc.start(); context.suspend();
}
initAudio()

function randInt(start, end) {
	return Math.floor(Math.random() * (end-start))+start;
}

function playSound(freq,length=200,type='square',volume=0.1) {
	gainNode.gain.value = volume;
	osc.type = type; // Sine, square, sawtooth, triangle
	osc.frequency.value = freq; // Hz
	context.resume();
	setTimeout(()=>context.suspend(),length);
}

function component(a, b, color, x, y) { // Create and handle individual boxes
    this.a = a, this.b = b, this.x = x, this.y = y;
	this.color = color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.y, this.x, boxW, boxH);
	
	this.toggleColor = function() {
		this.color = this.color == 'white' ? 'black' : 'white'
		ctx.fillStyle = this.color;
		ctx.fillRect(this.y, this.x, boxW, boxH);
		//console.log(this.a,this.b, this.color);
	}	
}

function initializeGame(gridDims) {
	gridW = parseInt(gridDims[0]), gridH = parseInt(gridDims[1]);
	foodCells = 1;
	cellColor = 'black';
	boxH = 25, boxW = 25; // Set box dimensions and grid size
	sp = 2; // Set box spacing
	grid = new Array(gridH); // Create array of boxes
	for (i=0; i<gridH; i++) {
		grid[i] = new Array(gridW);
	}
	var c = document.getElementById("game"); // Adjust canvas dimensions
	c.width = gridW * boxW + (sp * (gridW - 1));
	c.height = gridH * boxH + (sp * (gridH - 1));
	ctx = c.getContext("2d");
	for (var a=0; a<gridH; a++) { // Create all boxes at once	
		for (var b=0; b<gridW; b++) {
			grid[a][b] = new component(a,b,cellColor,(sp+boxW)*a,(sp+boxH)*b);
		}
	}
	initY = randInt(0,gridH);
	initX = randInt(0,gridW-1);
	//console.log('presnake',initY, initX, grid);
	snakeList = Array.from([[initY, initX+1], [initY, initX]]);
	// For some reason, snakeList sometimes starts with 3 squares
	//console.log('postsnake',snakeList[0],'is head of ',snakeList,'which should be',[[initY, initX+1], [initY, initX]]);
	grid[initY][initX].toggleColor();
	grid[initY][initX+1].toggleColor();
	direction = 2;
	pause = 0;
	over = 0;
	score = 0;
	spawnFood(foodCells);
}
initializeGame(getDims());

function moveToDirection(dir) {
	var notThisDir = (dir > 1) * 2 + !(dir%2); // Opposite of current direction
	if (direction != dir && direction != notThisDir && !movedThisFrame) {
		direction = dir;
		movedThisFrame = 1;
	}
}

// The following code is taken from https://stackoverflow.com/a/23230280/5732397
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
var xDown = null;
var yDown = null;

function handleTouchStart(e) {
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
};

function handleTouchMove(e) {
    var xUp = e.touches[0].clientX, yUp = e.touches[0].clientY;
    var dx = xDown - xUp, dy = yDown - yUp;
	//console.log(xUp, xDown, dx, yUp, yDown, dy);
    if ( Math.abs(dx) > Math.abs(dy) ) {
        if ( dx > 0 ) {
            moveToDirection(3);
        }
		else {
            moveToDirection(2);
        }
    } else {
        if ( dy > 0 ) {
            moveToDirection(0);
        }
		else {
            moveToDirection(1);
        }
    }
};
// This is the end of the code taken from StackOverflow.

document.addEventListener('keydown', function(e) { // Key controls
	//console.log(e.key);	
	switch (e.key) {
		case 'g':
			runFrame();
			break;
		case 'w':
		case 'ArrowUp':
			moveToDirection(0);
			break;
		case 's':
		case 'ArrowDown':
			moveToDirection(1);
			break;
		case 'd':
		case 'ArrowRight':
			moveToDirection(2);
			break;
		case 'a':
		case 'ArrowLeft':
			moveToDirection(3);
			break;
		case ' ':
			pause ^= 1;
			break;
		case 'r':
		case 'Enter':
			// Restart Game
			initializeGame(getDims());
			break;
	}
});

function spawnFood(num = 1) {
	for (var i=0; i<num; i++){
		if (score + 2 + foodCells < gridW * gridH) {
			while (1) {
				foodY = randInt(0,gridH), foodX = randInt(0,gridW);
				//console.log('spawn', foodY, foodX);
				if (grid[foodY][foodX].color == 'black') {
					grid[foodY][foodX].toggleColor();
					break;
				}
			}
		}
	}
}

function move() {
	head = snakeList[0];
	tail = snakeList[snakeList.length-1];
	var x = 0;
	var y = 0;
	if (direction < 2) {
		y = head[0]-1+direction*2, x = head[1];
	}
	else {
		y = head[0], x = head[1]+5-direction*2;
	}
	y %= gridH, x %= gridW;
	if (y < 0) y += gridH;
	if (x < 0) x += gridW;
	// If snake collides with itself, end game
	for (var i=0; i<snakeList.length; i++) if (snakeList[i][0] == y && snakeList[i][1] == x) return -1;
	snakeList.unshift([y,x]);
	if (grid[y][x].color == 'white') {
		playSound(450,200,'sine',.15);
		spawnFood();
		return 1;
	}
	else {
		grid[y][x].toggleColor();
		grid[tail[0]][tail[1]].toggleColor();
		snakeList.pop()
		return 0;
	}
}

function runFrame() {
	movedThisFrame = 0;
	if (!pause && !over) {
		frameScore = move();
		if (frameScore < 0) {
			over = 1;
			playSound(100, 400, 'sine');
			console.log("You scored "+score+" points!");
			//alert("You scored "+score+" points! Press enter or R to restart.");
		}
		else score += frameScore;
	}
}

function setNewInterval() {
	clearInterval(game);
	game = setInterval(runFrame,document.getElementById("speed").value);
}

game = setInterval(runFrame, 200);
