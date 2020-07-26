let playerScore = 0
let paddle
let ball
let bricks
let gameState
const speedIncrease = 0.05;
let life = 3

function setup() {
  
  
  createCanvas(800, 600);

  // let colors = createColors()
  gameState = 'playing'
  paddle = new Paddle()
  ball = new Ball(paddle)
  bricks = createBricks()
  
}

// We are only using 3 colors for the bricks based on their toughness.
// So we don't need to generate a list of colors. 

// function createColors() {
//   const colors = []
//   colors.push(color(265, 165, 0))
//   colors.push(color(135, 206, 250))
//   colors.push(color(147, 112, 219))
//   for (let i = 0; i < 10; i++) {
//     colors.push(color(random(0, 255), random(0, 255), random(0, 255)))
//   }
//   return colors
// }

function createBricks() {
  const bricks = []
  const rows = 10
  const bricksPerRow = 10
  const brickWidth = width / bricksPerRow
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, rows - row, Math.floor( Math.random() * 3 + 1 ))
      bricks.push(brick) 
    }
  }
  return bricks
}

function draw() {
  if(gameState === 'playing') {
    background(color(7, 26, 82))

    ball.bounceEdge()
    ball.bouncePaddle()
    
    ball.update()

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left')
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right')
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i]
      if (brick.isColliding(ball)) {
        ball.reverse('y')
       
        if(brick.toughness === 1) {  bricks.splice(i, 1) }// change toughness
        else {brick.toughness-=1}
        
        playerScore += brick.points
        ball.velocity.x= Math.sign(ball.velocity.x) * (Math.abs(ball.velocity.x)+speedIncrease) // increase speed of the ball
        ball.velocity.y= Math.sign(ball.velocity.y) * (Math.abs(ball.velocity.y)+speedIncrease)
      } else {
        brick.display()
      }
    }

    paddle.display()
    ball.display()

    textSize(32)
    fill(255)
    // text(`Score:${playerScore}`, width - 150, 50) 
    score.innerHTML = playerScore // Show score outside canvas.
    showLife.innerHTML = life 

    if (ball.belowBottom()) {
      if (life!==1) {life -= 1; ball = new Ball(paddle)}
      else gameState = 'Lose'
    }

    if (bricks.length === 0) {
      gameState = 'Win'
    }
  } else {
    textSize(100)
    gameState === 'Lose' ? fill(255, 0, 255) : fill(255)
    text(`You ${gameState}!!!`, width / 2 - 220, height / 2)
  }
}
