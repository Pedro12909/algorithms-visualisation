class Square {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = SQUARE_COLOR;
    this.parent = undefined;
    this.isWall = false;
    this.gScore = Number.MAX_SAFE_INTEGER;
  }

  display() {
    fill(this.color);
    rect(this.xPos * this.width, this.yPos * this.height, this.width, this.height);
  }

  makeWall() {
    this.isWall = true;
    this.updateColor(WALL_COLOR);
  }

  updateColor(color) {
    this.color = color;
    this.display();
  }
}