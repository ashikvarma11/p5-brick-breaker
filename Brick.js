class Brick {
  constructor(location, width, height,points,toughness) {
    this.location = location
    this.width = width
    this.height = height
    this.color = color(167, 255, 131)
    this.points = points
    this.toughness = toughness
  }

  display() {
    // console.log(this.color)
    if (this.toughness === 3) this.color = color(8, 106, 114)
    if (this.toughness === 2) this.color = color(23, 185, 120)
    if (this.toughness === 1) this.color = color(167, 255, 131)
    fill(this.color)
    textSize(10);
    rect(this.location.x, this.location.y, this.width, this.height)
 
  }

  isColliding(ball) {
    // collide with brick
    // AABB axis aligned bounding box
    if(ball.location.y - ball.radius <= this.location.y + this.height &&
        ball.location.y + ball.radius >= this.location.y &&
        ball.location.x + ball.radius >= this.location.x &&
        ball.location.x - ball.radius <= this.location.x + this.width) {
          return true
        }
  }
}