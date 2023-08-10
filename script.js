let availableWidth;
let availableHeight;
let main;
let gameArea;

/**
 * #ball {
  position: absolute;
  top: 100px;
  left: 100px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #270245;
}

#paddle {
  position: absolute;
  background-color: #ff2941;
  height: 25px;
  width: 65px;
  bottom: 25px;
  left: 200px;
}
 */

class Ball {
  //prettier-ignore
  constructor(topPosition,leftPosition,position,height,width,borderRadius,backgroundColor,velocityX,velocityY) {
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

const genRand = (start, end) => Math.random() * (end - start) + start;

//prettier-ignore
// const ball = new Ball("100px","150px","absolute","16px","16px","8px","#270245",3,3);

class Paddle {
  //prettier-ignore
  constructor(bottomPosition, leftPosition, position, height, width, backgroundColor, paddleVelocity) {
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
    paddle.style.bottom = this.bottomPosition;
    paddle.style.left = this.leftPosition;
    paddle.style.position = this.position;
    paddle.style.height = this.height;
    paddle.style.width = this.width;
    paddle.style.backgroundColor = this.backgroundColor;
    return paddle;
  }
}

const setUpGameArea = () => {
  availableHeight = window.innerHeight;
  availableWidth = window.innerWidth;

  main = document.querySelector("main");

  main.style.width = `${availableWidth - 25}px`;
  main.style.height = `${availableHeight - 25}px`;
  main.style.margin = "0 auto";
  gameArea = document.querySelector("#gameArea");
  gameArea.innerHTML = "";
  gameArea.style.width = `${availableWidth - 25}px`;
  gameArea.style.height = `${availableHeight - 95}px`;

  // Create Game Objects
  let randomBallPosition = Math.floor(genRand(10, availableWidth - 25));
  let randomPaddlePosition = Math.floor(genRand(10, availableWidth - 85));
  //prettier-ignore
  const ball = new Ball("100px",`${randomBallPosition}px`,"absolute","16px","16px","8px","#270245",3,3);
  //prettier-ignore
  const paddle = new Paddle("25px",`${randomPaddlePosition}px`,"absolute","25px","65px","#ff2941","48px");

  gameArea.appendChild(ball.createBall());
  gameArea.appendChild(paddle.createPaddle());
};

// First is initialize the main and gameArea after loading and every resize of page
window.addEventListener("load", setUpGameArea);
window.addEventListener("resize", setUpGameArea);

const initialize = () => {};
