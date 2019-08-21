const GRID_SIZE = 80;
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 800;
const DEFAULT_SPEED = 60;

function setupGrid() {
  const squareWidth = WINDOW_WIDTH / GRID_SIZE;
  const squareHeight = WINDOW_HEIGHT / GRID_SIZE;

  for (let i = 0; i < GRID_SIZE; i++) {
    squares[i] = new Array(GRID_SIZE);
    for(let j = 0; j < GRID_SIZE; j++) {
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
  squares = new Array(GRID_SIZE);
  orig = {};
  dest = {};
  openSet = [];
  closedSet = [];
  gameStarted = false;

  setupGrid();
  setOriginAndDestination(squares[0][0], squares[GRID_SIZE - 1][GRID_SIZE - 1]);

  orig.gScore = 0;
  orig.fScore = 0 + heuristic(orig);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT).parent('canvas');
  resetSketch();
  createControls();
}

function draw() {
  if (!gameStarted) return;

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
    resetSketch();
  }
}