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