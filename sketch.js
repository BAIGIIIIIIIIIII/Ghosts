let ghost1 = { x: 120, y: 150 };
let ghost2 = { x: 340, y: 200 };
let starX = [];
let starY = [];
let spawnEvery = 60;
let score = 0;
let duration = 30;
let startTime;

function setup() {
  createCanvas(480, 360);

  for (let i = 0; i < 40; i++) {
    starX[i] = random(width);
    starY[i] = random(290);
  }

  startTime = millis();
}

function draw() {
  background(60, 0, 0);
  noStroke();

  // stars
  fill(255, 255, 200);
  for (let i = 0; i < starX.length; i++) {
    ellipse(starX[i], starY[i], 3, 3);
  }

  fill(100, 0, 0);
  ellipse(400, 50, 70, 70);

  fill(0, 50, 0);
  rect(0, 300, 480, 60);

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);

  ghost1.x += random(-5, 5);
  ghost1.y += random(-3, 3);
  ghost2.x += random(-5, 5);
  ghost2.y += random(-3, 3);

  drawGhost(ghost1.x, ghost1.y);
  drawGhost(ghost2.x, ghost2.y);

  if (frameCount % spawnEvery === 0) {
    spawnGhost1();
    spawnGhost2();
  }

  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230, 120); 
  ellipse(x, y, 60, 60);

  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}

function spawnGhost1() {
  ghost1 = { x: random(40, width - 40), y: random(40, 260) };
}

function spawnGhost2() {
  ghost2 = { x: random(40, width - 40), y: random(40, 260) };
}

function mousePressed() {
  if (dist(mouseX, mouseY, ghost1.x, ghost1.y) < 30) {
    score++;
    spawnGhost1();
  }
  if (dist(mouseX, mouseY, ghost2.x, ghost2.y) < 30) {
    score++;
    spawnGhost2();
  }
}