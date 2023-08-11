import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

console.log("Script1");
let availableWidth;
let availableHeight;
let main;
let gameArea;
let timer;
let ballObject = {};
let paddleObject = {};
let currentScore = 0;
let score = document.querySelector("#score");
let gameAreaWidth;
let gameAreaHeight;
let ball;

// First thing that happens, when the window load or resize the game creates a new game area with new game Objects
window.addEventListener("load", setUpGameArea);
window.addEventListener("resize", setUpGameArea);

/**
 * Sets up the game area and creates a new paddle and ball object
 */
function setUpGameArea() {
  availableHeight = window.innerHeight;
  availableWidth = window.innerWidth;

  main = document.querySelector("main");
  main.style.width = `${availableWidth - 20}px`;
  main.style.height = `${availableHeight - 25}px`;
  main.style.margin = "0 auto";

  gameArea = document.querySelector("#gameArea");
  gameArea.innerHTML = "";
  gameArea.style.width = `${availableWidth - 20}px`;
  gameArea.style.height = `${availableHeight - 110}px`;
  gameAreaWidth = availableWidth - 20;
  gameAreaHeight = availableHeight - 25; // the height of the paddle

  // add the paddle and ball inside the game area

  // Create Game Objects
  const genRand = (start, end) => Math.random() * (end - start) + start;
  let randomBallPosition = Math.floor(genRand(10, availableWidth - 25));
  let randomPaddlePosition = Math.floor(genRand(10, availableWidth - 85));
  //prettier-ignore
  ballObject = new Ball("ball","100px",`${randomBallPosition}px`,"absolute","16px","16px","8px","#270245",3,3);
  //prettier-ignore
  paddleObject = new Paddle("paddle","25px",`${randomPaddlePosition}px`,"absolute","25px","65px","#ff2941",48);
  //create ball object
  let ball = ballObject.createBall();
  //create objects
  let paddle = paddleObject.createPaddle();

  gameArea.appendChild(ball);
  gameArea.appendChild(paddle);

  //Add the Key Listeners

  document.addEventListener("keydown", (event) => {
    paddleObject.leftPosition = parseInt(paddleObject.leftPosition);
    paddleObject.width = parseInt(paddleObject.width);
    if (event.key === "ArrowLeft") {
      paddleObject.leftPosition -= paddleObject.paddleVelocity;
      if (paddleObject.leftPosition < 10) paddleObject.leftPosition = 10;
    } else if (event.key == "ArrowRight") {
      paddleObject.leftPosition += paddleObject.paddleVelocity;
      if (paddleObject.leftPosition > availableWidth - 65)
        paddleObject.leftPosition = availableWidth - 75; // This seems to work? I have no explanation
    }
    const paddle = document.querySelector("#paddle");
    paddle.style.left = `${paddleObject.leftPosition}px`;
  });

  timer = requestAnimationFrame(play);
}

function play() {
  moveBall();
  detectCollisions();
  invertColor();

  ballObject.topPosition = parseInt(ballObject.topPosition);
  if (ballObject.topPosition < availableHeight - 25) {
    timer = requestAnimationFrame(play);
  } else {
    gameOver();
  }
}

function moveBall() {
  ball = document.querySelector("#ball");
  ballObject.leftPosition = parseInt(ballObject.leftPosition);
  ballObject.topPosition = parseInt(ballObject.topPosition);
  ballObject.leftPosition += ballObject.velocityX;
  ballObject.topPosition += ballObject.velocityY;
  ball.style.left = `${ballObject.leftPosition}px`;
  ball.style.top = `${ballObject.topPosition}px`;
}

function invertColor() {
  if (ballObject.topPosition < 40) {
    ball.style.backgroundColor = "white";
  } else {
    ball.style.backgroundColor = "#270245";
  }
}

function detectCollisions() {
  //prettier-ignore
  if (ballObject.leftPosition < 4 || ballObject.leftPosition > gameAreaWidth - 20) {
    ballObject.velocityX *= -1;
  }
  if (collisionY()) {
    ballObject.velocityY *= -1;
  }
}

function collisionY() {
  if (ballObject.topPosition < 4) {
    return true;
  }

  // The ball is 16 and the paddle is 25 = 41 rounded off to 45
  if (ballObject.topPosition > gameAreaHeight - 45) {
    if (
      ballObject.leftPosition >= paddleObject.leftPosition &&
      ballObject.leftPosition <= paddleObject.leftPosition + 65
    ) {
      score.innerHTML = "Score: " + currentScore;
      currentScore += 5;
      return true;
    }
  }
  return false;
}

function gameOver() {
  cancelAnimationFrame(timer);
  score.innerHTML += "    Game Over!";
  score.style.backgroundColor = "rgb(128,0,0)";
}
