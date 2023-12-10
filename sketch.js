var ballsAccuratelyClicked = 0;
var ballsMissed = 0;


function setup() {
  createCanvas(1200, 600);
  balls = []
}

function draw() {
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    if (balls[ballNum].size <= 0) {
        balls.splice(ballNum, 1);
        ballsMissed++;
        ballNum--;
    }
  }
  
  
  numBalls = balls.length;
  while (balls.length < 15) {
    var gravBall = new Ball();
    while (checkInitialCollision(gravBall)) {
      gravBall = new Ball();
    }
    balls.push(gravBall);
  }
  
  background(220);
  fill(0);
  textSize(16);
  text("Accurate Clicks: " + ballsAccuratelyClicked, 20, height - 40);
  text("Balls Missed: " + ballsMissed, 20, height - 20);
  
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].moveBall();
  }
  
  

  if (mouseIsPressed && keyIsDown(CONTROL)) {
    var gravBall = new Ball();
    gravBall.ballX = mouseX;
    gravBall.ballY = mouseY;
    for (var ballNum = 0; ballNum < balls.length; ballNum++) {
      if (collisionDetected(gravBall, balls[ballNum])) {
        return;
      }
    }
    balls.push(gravBall);
  } else if (mouseIsPressed) {
    var gravBall = new Ball();
    gravBall.ballX = mouseX;
    gravBall.ballY = mouseY;
    for (var ballNum = 0; ballNum < balls.length; ballNum++) {
      if (aimedCorrectly(mouseX, mouseY, balls[ballNum])) {
        balls.splice(ballNum, 1);
        ballsAccuratelyClicked++;
        ballNum--;
      }
    } 
  }
}

function aimedCorrectly(x, y, ball2){
  let radius2 = ball2.size / 2;
  let distance = dist(x, y, ball2.ballX, ball2.ballY);
  return distance < radius2;
}


function checkInitialCollision(newBall) {
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    if (collisionDetected(newBall, balls[ballNum])) {
      return true;
    }
  }
  return false;
}

function collisionDetected (ball1, ball2){
  let radius1 = ball1.size / 2;
  let radius2 = ball2.size / 2;
  if (ball1.ballX - radius1 < 0 || ball1.ballX + radius1 > 1200) {
    return true;
  }
  if (ball1.ballY - radius1 < 0 || ball1.ballY + radius1 > 600) {
    return true;
  }
  const distance = Math.sqrt(Math.pow(ball2.ballX - ball1.ballX, 2) + Math.pow(ball2.ballY - ball1.ballY, 2));
  return distance < radius1 + radius2;
}


class Ball {
  
  constructor() {
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    

    var magnitude = random(1.0,3.0)
    var direction = random(360)

    
    // Using trig to make sure the balls speed isn't dictated by whether it's going diagonally
    var angleInRadians = radians(direction);
    this.speedX = magnitude * cos(angleInRadians);
    this.speedY = magnitude * sin(angleInRadians);
    this.size = random(30,100);
    
    this.alpha = 250
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255);
    
    
    this.red   = this.red + balls.length;
    if (this.red > 255) {
      this.red = 255
    }
    this.green = this.green - balls.length;
    if (this.green < 0) {
      this.green = 0
    }
    this.blue = this.blue - balls.length;
    if (this.blue < 0) {
      this.blue = 0
    }
    
    if (random(50) == 1) {
      this.red = 0
      this.green = 255
      this.blue = 255
    }
    
    
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
      this.size = this.size -10;
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX; 
      this.size = this.size -10;
    }
  }
  
  moveBall() {
    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}