var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
	x: 160,
	y: 160,

	// ormens hastighet
	dx: grid,
	dy: 0,

	// utrymme som ormen tar upp
	cells: [],

	// ormens längd
	maxCells: 4
};
var apple = {
	x: 320,
	y: 320
};

// slumpade nummer
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// gameloopen
function loop() {
	requestAnimationFrame(loop);

	/* Gör spelet till 15fps */
	if (++count < 4) {
		return;
	}

	count = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);

	// rör på ormen
	snake.x += snake.dx;
	snake.y += snake.dy;

	// spegla kanterna av canvas
	if (snake.x < 0) {
		snake.x = canvas.width - grid;
	} else if (snake.x >= canvas.width) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - grid;
	} else if (snake.y >= canvas.height) {
		snake.y = 0;
	}

	// håll koll på ormens plats
	snake.cells.unshift({
		x: snake.x,
		y: snake.y
	});

	// ta bort kroppsdelar bakom ormen när den rör på sig
	if (snake.cells.length > snake.maxCells) {
		snake.cells.pop();
	}

	// rita ut "äpplen"
	context.fillStyle = 'red';
	context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

	// rita ormen
	context.fillStyle = 'green';
	snake.cells.forEach(function (cell, index) {

		// ge ormens kroppsdelar 1px avstång mellan varandra
		context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

		// om ormen får poäng, lägg till en kroppsdel
		if (cell.x === apple.x && cell.y === apple.y) {
			snake.maxCells++;

			//gör en grid på 25x25 px
			apple.x = getRandomInt(0, 25) * grid;
			apple.y = getRandomInt(0, 25) * grid;
		}

		// kolla efter kollision med alla celler
		for (var i = index + 1; i < snake.cells.length; i++) {

			// om du kraschar, starta om spelet
			if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
				snake.x = 160;
				snake.y = 160;
				snake.cells = [];
				snake.maxCells = 4;
				snake.dx = grid;
				snake.dy = 0;

				apple.x = getRandomInt(0, 25) * grid;
				apple.y = getRandomInt(0, 25) * grid;
			}
		}
	});
}

// lyssna på tangenter
document.addEventListener('keydown', function (e) {

	// vänster pil
	if (e.which === 37 && snake.dx === 0) {
		snake.dx = -grid;
		snake.dy = 0;
	}
	// uppåt pil
	else if (e.which === 38 && snake.dy === 0) {
		snake.dy = -grid;
		snake.dx = 0;
	}
	// höger pil
	else if (e.which === 39 && snake.dx === 0) {
		snake.dx = grid;
		snake.dy = 0;
	}
	// neråt pil
	else if (e.which === 40 && snake.dy === 0) {
		snake.dy = grid;
		snake.dx = 0;
	}
});

// starta spelet
requestAnimationFrame(loop);