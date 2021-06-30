let currentCount = 1;
let maxCount;
let x = [];
let y = [];
let r = [];

//wave
let startAngle = 0;
let angleVel = 0.23;


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  //first pixel
  x[0] = 0;
  y[0] = random(height);
  r[0] = random(10,20);
  maxCount =height*2.25;


}

function draw() {
  background(random(0,100), 50, 100, 10);
  pixelgrid();
  push();
  shearX(map(mouseY, 0, height, 0, 100));
  wave();
  pop();
}


function pixelgrid(){
  rectMode(CENTER)
  var newR = random(10,20);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  // which pixel is the closest?
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // aline it to the closest circle outline
  var angle = atan(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  // draw them
  for (var i = 0; i < currentCount; i++) {
    fill(random(200,360), random(100), random(100), 50);
    stroke(0)
;    square(x[i], y[i], r[i]);
  }

  if (currentCount >= maxCount){
    currentCount = 1;
    x[0] = 0;
    y[0] = random(height);
  }
}

function wave(){
  startAngle += 0.015;
  let angle = startAngle;
  for (let x = 0; x <= mouseX; x += 24) {
    let y = map(sin(angle), -1, 1, mouseY-200, mouseY);
    //let y = map(sin(angle), -1, 1, 0, height);
    stroke(random(100,200), 100, 75);
    noFill();
    //fill(255, 50);
    //strokeWeight(2);
    for (i = 0; i < 10; i++){
      ellipse(x, y, 7*i);
      angle += angleVel;
    }

  }
}



