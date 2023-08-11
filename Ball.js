class Ball {
  //prettier-ignore
  constructor(type,topPosition,leftPosition,position,height,width,borderRadius,backgroundColor,velocityX,velocityY) {
    this.type = type,  
    this.topPosition = topPosition,
      this.leftPosition = leftPosition,
      this.position = position,
      this.height = height,
      this.width = width,
      this.borderRadius = borderRadius,
      this.backgroundColor = backgroundColor,
      this.velocityX = velocityX,
      this.velocityY = velocityY;
    }
  createBall() {
    let ball = document.createElement("div");
    ball.setAttribute("id", this.type);
    ball.style.top = this.topPosition;
    ball.style.left = this.leftPosition;
    ball.style.position = this.position;
    ball.style.height = this.height;
    ball.style.width = this.width;
    ball.style.borderRadius = this.borderRadius;
    ball.style.backgroundColor = this.backgroundColor;
    return ball;
  }
}

export default Ball;
