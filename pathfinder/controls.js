let fpsSlider;
let fpsLabel;
let gameStarted;

function createControls() {
  select('#playBtn').mousePressed(function() {
    gameStarted = !gameStarted;
  });
}
