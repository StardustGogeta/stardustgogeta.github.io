var context = new window.AudioContext(); // Set up audio system
var osc = context.createOscillator();
osc.connect(context.destination);
osc.start(); context.suspend();

g = context.createGain();
g.gain.value = 0.01; // This should theoretically make the sound quieter

function playSound(freq,type='square') {
	osc.type = type; // Sine, square, sawtooth, triangle
	osc.frequency.value = freq; // Hz
	context.resume();
	setTimeout(()=>context.suspend(),100);
}
var over = 0;
cellColor = '#55F';
colors = ['blue','green','red','orange','purple','brown','gray','pink'];
gridW = 20; boxW = 25; // Set box dimensions and grid size
gridH = 20; boxH = 25;
sp = 2;

bombChance = .1;

// Create bomb boolean array
bombs = [...Array(gridW)].map(_=>Array(gridH).fill(0));

bombCount = 0;
while (bombCount < gridW * gridH * bombChance) {
	var selectX = Math.floor(gridW * Math.random());
	var selectY = Math.floor(gridH * Math.random());
	if (bombs[selectX][selectY] == 0) {
		bombs[selectX][selectY] = 1;
		bombCount++;
	}
}

zones = new Array(gridW); // Create array of boxes
for (i=0; i<gridW; i++) {
	zones[i] = new Array(gridH);
}
var c = document.getElementById("game"); // Adjust canvas dimensions
c.width = gridW * boxW + (sp * (gridW - 1));
c.height = gridH * boxH + (sp * (gridH - 1));
var ctx = c.getContext("2d");

function getNearbyBombs(a, b) { // Find number of nearby bombs
	var near = (a > 0 ? bombs[a-1][b] + (b > 0 ? bombs[a-1][b-1] : 0) + (b < gridH-1 ? bombs[a-1][b+1] : 0) : 0)
		+ (a < gridW-1 ? bombs[a+1][b] + (b > 0 ? bombs[a+1][b-1] : 0) + (b < gridH-1 ? bombs[a+1][b+1] : 0) : 0)
		+ (b > 0 ? bombs[a][b-1] : 0) + (b < gridH-1 ? bombs[a][b+1] : 0);
	return near;
}

function checkGameWin() {
	for (var a = 0; a < gridW; a++) {
		for (var b = 0; b < gridH; b++) {
			if (!bombs[a][b] && zones[a][b].unclicked) {
				return false;
			}
		}
	}
	return true;
}

function component(a, b, color) { // Create and handle individual boxes
    this.x = (sp + boxW) * a;
    this.y = (sp + boxH) * b;
	this.a = a;
	this.b = b;
	this.bomb = bombs[a][b];
	this.bCN = getNearbyBombs(a, b); // Find bomb count nearby
	this.color = color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, boxW, boxH);
	this.unclicked = true;
	this.flagDown = false;
	this.flag = function () {
		if (this.unclicked && !over) {
			playSound(400,'sine');
			ctx.fillStyle = this.flagDown ? this.color : "yellow";
			ctx.fillRect(this.x, this.y, boxW, boxH);
			this.flagDown ^= 1;
		}
	};
	this.clicked = function() {
		if (this.unclicked && !this.flagDown && !over) {
			this.unclicked = false;
			if (this.bomb) {
				playSound(1000);
				ctx.fillStyle = "red";
				ctx.fillRect(this.x, this.y, boxW, boxH);
				setTimeout(()=>{
					if (!over) {
					zones.forEach(a=>a.forEach(b=>{if(b.bomb)b.clicked()})); // Click all bombs
					over = 1;
					ctx.font = "bold "+Math.min(boxW*3,boxH*3)+"px Arial";
					playSound(800);
					ctx.fillStyle = "black";
					ctx.fillText('GAME OVER', (sp+boxW)*gridW/16, (sp+boxH)*gridH/2);
					}}, 500);
			}
			else {
				playSound(256);
				ctx.fillStyle = "#FFF";
				ctx.fillRect(this.x, this.y, boxW, boxH);
				ctx.fillStyle = colors[this.bCN-1];
				ctx.font = Math.min(boxW, boxH)+"px Arial";
				if (this.bCN) ctx.fillText(this.bCN, this.x+(boxW)/4, this.y+boxH*7/8);
				else { // If empty, click all nearby boxes
					if (a > 0) {
						zones[a-1][b].clicked();
						if (b > 0) zones[a-1][b-1].clicked();
						if (b < gridH-1) zones[a-1][b+1].clicked();
					}
					if (a < gridW-1) {
						zones[a+1][b].clicked();
						if (b > 0) zones[a+1][b-1].clicked();
						if (b < gridH-1) zones[a+1][b+1].clicked();
					}
					if (b > 0) zones[a][b-1].clicked();
					if (b < gridH-1) zones[a][b+1].clicked();
				}
				if (checkGameWin()) {
					over = 2;
					setTimeout(()=>{
						ctx.font = "bold "+Math.min(boxW*3,boxH*3)+"px Arial";
						playSound(800);
						ctx.fillStyle = "black";
						ctx.fillText('VICTORY!', (sp+boxW)*gridW/6, (sp+boxH)*gridH/2);
						}, 500);
				}
			}
		}
	}
};

for (var a = 0; a < gridW; a++) { // Create all boxes at once
	for (var b = 0; b < gridH; b++) {
		zones[a][b] = new component(a, b, cellColor);
	}
}
console.log("Boxes prepared.");

c.onclick = function(e) { // Handle clicks on boxes
	a = Math.floor(e.offsetX / (boxW+sp));
	b = Math.floor(e.offsetY / (boxH+sp));
	zones[a][b].clicked();
}

c.oncontextmenu = function(e) { // Handle right-clicks on boxes
	a = Math.floor(e.offsetX / (boxW+sp));
	b = Math.floor(e.offsetY / (boxH+sp));
	zones[a][b].flag();
	return false;
}

//zones.forEach(a=>a.forEach(b=>b.clicked())); // Click all boxes
// zones.forEach(a=>a.forEach(b=>{if(!b.bomb)b.clicked()})); // Click all correct boxes
