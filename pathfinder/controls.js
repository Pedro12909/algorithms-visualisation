let gameStarted;

let gridSizeInput, fpsInput;

function createControls() {
  select('#playBtn').mousePressed(function() {
    gameStarted = !gameStarted;
  });

  select('#resetBtn').mousePressed(function() {
    resetSketch();
  });

  select('#applyBtn').mousePressed(applySettingsBtnHandler);

  gridSizeInput = select('#gridSizeInput');
  gridSizeInput.value(DEFAULT_GRID_SIZE);

  fpsInput = select('#fpsInput');
  fpsInput.value(DEFAULT_SPEED);
}

function applySettingsBtnHandler() {
  let newGridSize = parseInt(gridSizeInput.value());
  let newSpeed = parseInt(fpsInput.value());

  gridSize = Number.isNaN(newGridSize) ? DEFAULT_GRID_SIZE : abs(newGridSize); 
  speed = Number.isNaN(newSpeed) ? DEFAULT_SPEED : abs(newSpeed);

  resetSketch();
}
