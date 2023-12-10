
function setup() {
  createCanvas(400, 400);
  balls = []
}

function draw() {
  numBalls = balls.length;
  
  
  var totalRed = 0
  var totalBlue = 0
  var totalGreen = 0
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    totalRed = totalRed + balls[ballNum].red
    totalBlue = totalBlue + balls[ballNum].blue
    totalGreen = totalGreen + balls[ballNum].green
   
  }
  
  background(Math.floor(255-totalRed/numBalls), Math.floor(255-totalBlue/numBalls), Math.floor(255-totalGreen/numBalls));
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].moveBall();
  }
  
  

  if (mouseIsPressed) {
    var gravBall = new Ball();
    gravBall.ballX = mouseX;
    gravBall.ballY = mouseY;
    for (var ballNum = 0; ballNum < balls.length; ballNum++) {
      if (collisionDetected(gravBall, balls[ballNum])) {
        return
      }
    }
    
    
    balls.push(gravBall);
  }
}



function collisionDetected (ball1, ball2){
  let radius1 = ball1.size / 2;
  let radius2 = ball2.size / 2;
  
  if (ball1.ballX - radius1 < 0) {
    return true;
  }
  if (ball1.ballX + radius1 > 400) {
    return true;
  }
  if (ball1.ballY - radius1 < 0) {
    return true;
  }
  if (ball1.ballY + radius1 > 400) {
    return true;
  }
  const distance = Math.sqrt(Math.pow(ball2.ballX - ball1.ballX, 2) + Math.pow(ball2.ballY - ball1.ballY, 2));
  return distance < radius1 + radius2;
}


class Ball {
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    
    
    
     
    
    this.speedY = random()
    this.speedX = sqrt(1-(this.speedY)^2)
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
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
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.size = random(100);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {
    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}