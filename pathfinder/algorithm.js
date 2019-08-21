let squares;
let orig;
let dest;

let openSet;
let closedSet;

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