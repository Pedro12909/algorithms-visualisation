const GRID_SIZE = 80;
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 800;
const SPEED = 60;

const ORIG_COLOR = '#849324';
const DEST_COLOR = 'green';
const CLOSED_SET_COLOR = '#FFB30F';
const OPEN_SET_COLOR = '#FD151B';
const PATH_COLOR = '#437FDE';

const squares = new Array(GRID_SIZE);
let orig = {};
let dest = {};

const openSet = [];
const closedSet = [];

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

function heuristic (node) {
  return Math.sqrt(Math.pow((node.xPos - dest.xPos), 2) + Math.pow((node.yPos - dest.yPos), 2));
}

function nextNodeInOpenSet() {
  let min = Number.MAX_SAFE_INTEGER;
  let maxIndex = 0;

  for (let i = 0; i < openSet.length; i++) {
    const node = openSet[i];

    if (node.fScore < min) {
      min = node.fScore;
      maxIndex = i;
    }
  }

  return openSet[maxIndex];
}

function removeFromOpenSet(node) {
  for (let i = 0; i < openSet.length; i++) {
    const currentNode = openSet[i];

    if (currentNode.xPos === node.xPos && currentNode.yPos === node.yPos) {
      openSet.splice(i, 1);
      return;
    }
  }
}

function getNodeNeighbors(node) {
  const nodeXPos = node.xPos;
  const nodeYPos = node.yPos;

  const neighbors = [];

  if (nodeXPos > 0 && !squares[nodeXPos - 1][nodeYPos].isWall) {
    neighbors.push(squares[nodeXPos - 1][nodeYPos]);
  }
  if (nodeXPos < GRID_SIZE - 1 && !squares[nodeXPos + 1][nodeYPos].isWall) {
    neighbors.push(squares[nodeXPos + 1][nodeYPos]);
  }
  if (nodeYPos > 0 && !squares[nodeXPos][nodeYPos - 1].isWall) {
    neighbors.push(squares[nodeXPos][nodeYPos - 1]);
  }
  if (nodeYPos < GRID_SIZE - 1 && !squares[nodeXPos][nodeYPos + 1].isWall) {
    neighbors.push(squares[nodeXPos][nodeYPos + 1]);
  }
  if (nodeXPos > 0 && nodeYPos > 0 && !squares[nodeXPos - 1][nodeYPos - 1].isWall) {
    neighbors.push(squares[nodeXPos - 1][nodeYPos - 1]);
  }
  if (nodeXPos < GRID_SIZE - 1 && nodeYPos > 0 && !squares[nodeXPos + 1][nodeYPos - 1].isWall) {
    neighbors.push(squares[nodeXPos + 1][nodeYPos - 1]);
  }
  if (nodeXPos > 0 && nodeYPos < GRID_SIZE - 1 && !squares[nodeXPos - 1][nodeYPos + 1].isWall) {
    neighbors.push(squares[nodeXPos - 1][nodeYPos + 1]);
  }
  if (nodeXPos < GRID_SIZE - 1 && nodeYPos < GRID_SIZE - 1 && !squares[nodeXPos + 1][nodeYPos + 1].isWall) {
    neighbors.push(squares[nodeXPos + 1][nodeYPos + 1]);
  }

  return neighbors;
}

function constructPath() {
  let currentNode = dest;

  while (currentNode.parent) {
    currentNode.updateColor(PATH_COLOR);
    currentNode = currentNode.parent;
  }

  orig.updateColor(PATH_COLOR);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  frameRate(SPEED);
  setupGrid();

  setOriginAndDestination(squares[0][0], squares[GRID_SIZE - 1][GRID_SIZE - 1]);

  orig.gScore = 0;
  orig.fScore = 0 + this.heuristic(orig);
}

function draw() {
  if (openSet.length > 0) {
    const currentNode = this.nextNodeInOpenSet();

    if (currentNode == dest) {
      this.constructPath();
      noLoop();
      return;
    }

    this.removeFromOpenSet(currentNode);
    closedSet.push(currentNode);
    currentNode.updateColor(CLOSED_SET_COLOR);

    const neighbors = this.getNodeNeighbors(currentNode);

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
    noLoop();
    return;
  }
}

class Square {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = 'white';
    this.parent = undefined;
    this.isWall = random() < 0.3;
    this.gScore = Number.MAX_SAFE_INTEGER;

    if (this.isWall) this.color = 'black'
  }

  display() {
    fill(this.color);
    rect(this.xPos * this.width, this.yPos * this.height, this.width, this.height);
  }

  updateColor(color) {
    this.color = color;
    this.display();
  }
}