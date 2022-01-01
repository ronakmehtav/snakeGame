const ROWS = 60;
const COLS = 100;
const PIXEL = 10;
const canvas = document.getElementById("canvas");

function initializeCanvas() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let pixel = document.createElement("div");
      pixel.style.position = "absolute";
      pixel.id = `${row} ${col}`;
      pixel.style.border = "1px solid red";
      pixel.style.width = PIXEL + "px";
      pixel.style.height = PIXEL + "px";
      pixel.style.left = col * PIXEL + "px";
      pixel.style.top = row * PIXEL + "px";
      canvas.appendChild(pixel);
    }
  }
}
// initialize the canvas
initializeCanvas();

let snakePosition = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
];

let newSnakePosition;

// draw the initial Snake Position
drawSnake(snakePosition);

function setSnakePosition(newSnakePosition) {
  snakePosition = newSnakePosition;
}

function drawSnake(snake) {
  for (let index = 0; index < snake.length; index++) {
    const element = snake[index];
    document.getElementById(`${element[0]} ${element[1]}`).style.background =
      "black";
  }
}

function renderSnake(newSnakePosition) {
  let currentSnakePosition = new Set();
  newSnakePosition.map((elm) =>
    currentSnakePosition.add(`${elm[0]} ${elm[1]}`)
  );
  let prevSnakePosition = snakePosition;
  prevSnakePosition.forEach((elm) => {
    const id = `${elm[0]} ${elm[1]}`;
    if (!currentSnakePosition.has(id)) {
      document.getElementById(id).style.background = "white";
    }
  });
  drawSnake(newSnakePosition);
}

function run() {
  newSnakePosition = snakePosition.slice();
  newSnakePosition.shift(0);
  let elm = newSnakePosition.at(-1);
  elm = [elm[0], elm[1] + 1];
  if (isSnakeGoingOutOfCanvas(elm)) {
    return;
  }
  newSnakePosition.push(elm);
  renderSnake(newSnakePosition);
  setSnakePosition(newSnakePosition);
}

function isSnakeGoingOutOfCanvas(elm) {
  return elm[1] >= COLS || elm[0] >= ROWS || elm[1] < 0 || elm[0] < 0;
}

function game() {
  setInterval(run, 100);
}
game();
