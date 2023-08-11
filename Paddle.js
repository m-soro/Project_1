class Paddle {
  //prettier-ignore
  constructor(type, bottomPosition, leftPosition, position, height, width, backgroundColor, paddleVelocity) {
    this.type = type  
    this.bottomPosition = bottomPosition,
      this.leftPosition = leftPosition, 
      this.position = position,
      this.height = height,
      this.width = width
      this.backgroundColor = backgroundColor,
      this.paddleVelocity = paddleVelocity
    }

  createPaddle() {
    let paddle = document.createElement("div");
    paddle.setAttribute("id", this.type);
    paddle.style.bottom = this.bottomPosition;
    paddle.style.left = this.leftPosition;
    paddle.style.position = this.position;
    paddle.style.height = this.height;
    paddle.style.width = this.width;
    paddle.style.backgroundColor = this.backgroundColor;
    return paddle;
  }
}

export default Paddle;
