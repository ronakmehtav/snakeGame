const ROWS = 60;
const COLS = 100;
const PIXEL = 10;
const canvas = document.getElementById("canvas");
let currentDirection = "down";
const DirectionalObj = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

window.onkeydown = (key) => {
  console.log(key.key);
  if (key.key === "w") {
    console.log(key);
    currentDirection = "up";
  } else if (key.key === "d") {
    console.log(key);
    currentDirection = "right";
  } else if (key.key === "a") {
    console.log(key);
    currentDirection = "left";
  } else if (key.key === "s") {
    console.log(key);
    currentDirection = "down";
  }
};

function addArray(direction, elm) {
  const val = DirectionalObj[direction];
  return [val[0] + elm[0], val[1] + elm[1]];
}

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
  createNextSnakePosition();
  renderSnake(newSnakePosition);
  setSnakePosition(newSnakePosition);
}

function createNextSnakePosition() {
  newSnakePosition = snakePosition.slice();
  let elm = newSnakePosition.at(-1);
  elm = addArray(currentDirection, elm);
  if (isSnakeGoingOutOfCanvas(elm)) {
    gameOver();
    return;
  }
  newSnakePosition.shift(0);
  newSnakePosition.push(elm);
}

function isSnakeGoingOutOfCanvas(elm) {
  return elm[1] >= COLS || elm[0] >= ROWS || elm[1] < 0 || elm[0] < 0;
}

const currentGame = setInterval(run, 150);

function gameOver() {
  clearInterval(currentGame);
  console.log("executing termination");
}
