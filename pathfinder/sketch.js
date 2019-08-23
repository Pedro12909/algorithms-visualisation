const DEFAULT_GRID_SIZE = 8;
const DEFAULT_SPEED = 60;
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 800;

let gridSize = DEFAULT_GRID_SIZE;
let speed = DEFAULT_SPEED;

function setupGrid() {
  const squareWidth = WINDOW_WIDTH / gridSize;
  const squareHeight = WINDOW_HEIGHT / gridSize;

  for (let i = 0; i < gridSize; i++) {
    squares[i] = new Array(gridSize);
    for(let j = 0; j < gridSize; j++) {
      const square = new Square(i, j, squareWidth, squareHeight);
      squares[i][j] = square;
      square.display();
    }
  }
}

function setOriginAndDestination(origin, destination) {
  origin.updateColor(ORIG_COLOR);
  destination.updateColor(DEST_COLOR);
  orig = origin;
  dest = destination;

  orig.isWall = false;
  dest.isWall = false;

  openSet.push(orig);
}

function constructPath(node) {
  let currentNode = node;

  while (currentNode.parent) {
    currentNode.updateColor(PATH_COLOR);
    currentNode = currentNode.parent;
  }

  orig.updateColor(PATH_COLOR);
}

function resetSketch() {
  squares = new Array(gridSize);
  orig = {};
  dest = {};
  openSet = [];
  closedSet = [];
  gameStarted = false;

  setupGrid();
  setOriginAndDestination(squares[0][0], squares[gridSize - 1][gridSize - 1]);

  orig.gScore = 0;
  orig.fScore = 0 + heuristic(orig);
}

function handleDrawing() {
  if (!mouseIsPressed) return;
  const x = mouseX;
  const y = mouseY;

  if (x < 0 || y < 0 || x > width || y > height) return;

  const i = floor(x / (width /gridSize));
  const j = floor(y / (height / gridSize));

  const pressedSquare = squares[i][j];
  pressedSquare.makeWall();
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT).parent('canvas');
  resetSketch();
  createControls();
}

function draw() {
  if (!gameStarted) {
    handleDrawing();
    return;
  };

  if (openSet.length > 0) {
    const currentNode = nextNodeInOpenSet();

    if (currentNode == dest) {
      constructPath(dest);
      return;
    }

    removeFromOpenSet(currentNode);
    closedSet.push(currentNode);
    currentNode.updateColor(CLOSED_SET_COLOR);

    const neighbors = getNodeNeighbors(currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      const currentNeighbor = neighbors[i];

      if (closedSet.includes(currentNeighbor)) continue;

      const tempGScore = currentNode.gScore + dist(currentNode.xPos, currentNode.yPos, currentNeighbor.xPos, currentNeighbor.yPos);

      if (!openSet.includes(currentNeighbor)) {
        openSet.push(currentNeighbor);
        currentNeighbor.updateColor(OPEN_SET_COLOR);
      }
      if (tempGScore < currentNeighbor.gScore) {
        currentNeighbor.parent = currentNode;
        currentNeighbor.gScore = tempGScore;
        currentNeighbor.fScore =  tempGScore + this.heuristic(currentNeighbor);
      }
    }
  } else {
    alert('Game Over! No Solution!');
    squares = new Array(gridSize);
    resetSketch();
  }
}