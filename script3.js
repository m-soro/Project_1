import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

console.log("Script3");
let availableWidth;
let availableHeight;
let main;
let gameArea;
let timer;
let ballObject = {};
let paddleObject = {};
let currentScore = 0;
let gameAreaWidth;
let gameAreaHeight;
let leftAndRightMargin = 20;
let ball;
let score = document.querySelector("#score");
let paddle = document.querySelector("#paddle");
let menu = document.querySelector(".menu");
let innerMenu = document.querySelector("#inner-menu");
let innerMenuShowing = false;
let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let hard = document.querySelector("#hard");
let sound = document.querySelector("#sound");
let music = document.querySelector("#music");
let start = document.querySelector("#start");

// First thing that happens, when the window load or resize the game creates a new game area with new game Objects
window.addEventListener("load", setUpGameArea);
window.addEventListener("resize", setUpGameArea);

/**
 * Sets up the game area and creates a new paddle and ball object
 */
function setUpGameArea() {
  availableHeight = window.innerHeight;
  availableWidth = window.innerWidth;

  // There was really not much difference between the main and gameArea
  main = document.querySelector("main");
  main.style.width = `${availableWidth - leftAndRightMargin}px`;
  main.style.height = `${availableHeight - 25}px`; // hardcoding 25 paddle object width is not yet initialized
  main.style.margin = "0 auto";

  gameArea = document.querySelector("#gameArea");
  gameArea.innerHTML = "";
  gameArea.style.width = `${availableWidth - leftAndRightMargin}px`;
  gameArea.style.height = `${availableHeight - 140}px`;
  gameAreaWidth = availableWidth - leftAndRightMargin;
  gameAreaHeight = availableHeight - 25; // hardcoding 25 paddle object width is not yet initialized

  // add the paddle and ball inside the game area

  // Create Randomly Positioned Game Objects
  const genRand = (start, end) => Math.random() * (end - start) + start;
  let randomBallPosition = Math.floor(genRand(100, availableWidth - 100)); // 100 to start and less than 100 of available width, so that the ball don't show up too close to the edge
  let randomPaddlePosition = Math.floor(genRand(100, availableWidth - 85)); // 100 to start and then available width less than 85 because the width of the paddle is 65 + margin of 10 px on each edge
  //prettier-ignore
  ballObject = new Ball("ball","100px",`${randomBallPosition}px`,"absolute","16px","16px","8px","#270245",3,3);
  //prettier-ignore
  paddleObject = new Paddle("paddle","25px",`${randomPaddlePosition}px`,"absolute","25px","65px","#ff2941",48);
  //create ball object
  let ball = ballObject.createBall();
  //create objects
  let paddle = paddleObject.createPaddle();

  gameArea.appendChild(paddle);

  //Add the Key Listeners
  document.addEventListener("keydown", arrowKeysListener, false);

  // menu options
  menu.addEventListener("click", menuShow, false);
  // hard.addEventListener("click", () => {
  //   ballObject.velocityX += 2;
  //   ballObject.velocityY += 2;
  //   console.log("X:", ballObject.velocityX, "Y:", ballObject.velocityY);
  // });

  start.addEventListener("click", () => {
    gameArea.appendChild(ball);
    timer = requestAnimationFrame(play);
  });
}

function arrowKeysListener(event) {
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
}

function menuShow() {
  if (innerMenu.classList.value) {
    console.log("is the innermenu showing");
    innerMenu.classList.toggle("hide");
    cancelAnimationFrame(timer);
  } else if (!innerMenu.classList.value) {
    innerMenu.classList.toggle("hide");
    timer = requestAnimationFrame(play);
  }
}

function play() {
  console.log(ballObject.velocityX, ballObject.velocityY);
  moveBall();
  collisionDetection();
  invertColor();

  // ball object css top property is string, this needs to be converted to integers first
  ballObject.topPosition = parseInt(ballObject.topPosition);
  // If the ballObject topPosition is smaller number then its up in the gameArea.
  // Id the top position is smaller compared to the GameArea height less than the height of the paddle
  // Then keep playing
  if (ballObject.topPosition < gameAreaHeight - 25) {
    timer = requestAnimationFrame(play);
  } else {
    // As the ball goes down the topPosition number goes up, if it reaches the window's gameAreaHeight less than the height of the paddle then the ball has pass the paddle
    gameOver();
  }
}

/**
 * ---------
 * MOVEBALL
 * ---------
 * Creates point to point animation by adding small increments to ball top and left property
 */
function moveBall() {
  // grab the ball object created by the SetUpGame function
  ball = document.querySelector("#ball");
  // since the top and left position are css property which are strings, these needs to be converted into integers
  ballObject.leftPosition = parseInt(ballObject.leftPosition);
  ballObject.topPosition = parseInt(ballObject.topPosition);
  // when the ball velocityX + ball left position and ball velocityY + ball top position, these create point to point animation
  ballObject.leftPosition += ballObject.velocityX;
  ballObject.topPosition += ballObject.velocityY;
  // assign computed values to ball css top and left property
  ball.style.left = `${ballObject.leftPosition}px`;
  ball.style.top = `${ballObject.topPosition}px`;
}

/**
 * ------------
 * INVERTCOLOR
 * ------------
 * Changes the color of the ball when it reaches the top headers or if the ball reaches lower than the paddle
 */
function invertColor() {
  if (
    ballObject.topPosition < 86 // Menu height is 46 + Score bar is 40 = 86
  ) {
    ball.style.backgroundColor = "white"; // turn white
  } else if (ballObject.topPosition > gameAreaHeight - 25) {
    // Has the ball top position passed the paddle?
    ball.style.display = "none";
  } else {
    ball.style.backgroundColor = "#270245";
  }
}

function collisionDetection() {
  // instead of writing muliple conditions its so much easier to understand if its broken up to separate functions
  // for collision in x axis and xollision in y axis
  if (collisionX()) {
    // if any left or right edges are hit then multiply the ball velocityX to negative value, this makes the object move away
    ballObject.velocityX *= -1;
  }

  if (collisionY()) {
    // if the top of the screen or the paddle is hit then multiply the ball velocityY to negative value
    ballObject.velocityY *= -1;
  }
}

function collisionX() {
  if (
    // First condition, checks if the ballleftposition is less than 10, left side is SMALL numbers! it goes up the further you move to the right!
    ballObject.leftPosition < leftAndRightMargin / 2 ||
    // Second condition, checks if ballleftposition is greater than the width of the gameArea less the 10px margin on the right. BIG numbers here!
    ballObject.leftPosition > gameAreaWidth - leftAndRightMargin / 2
  ) {
    return true;
  }
  return false;
}

function collisionY() {
  // checks if ball hits the top position
  if (ballObject.topPosition < 4) {
    return true;
  }

  // The ball is 16px height and the paddle is 25px height = 41 add a bit of cushion = 45
  // Is the ball top position greater than gameAreaHeight less than the size of the ball and paddle
  // Is the ball above the paddle?
  if (ballObject.topPosition > gameAreaHeight - 45) {
    //prettier-ignore
    if (ballObject.leftPosition >= paddleObject.leftPosition && ballObject.leftPosition <= paddleObject.leftPosition + paddleObject.width) {
      // Since we know exactly where the objects are in the playing area we can check if the ball is in between the paddle using this positions
      // First condition checks if the ball is at the left edge of the paddle. It asks, is the ball inside the left edge of the paddle?
      // Second condition checks if the ball has gone outside of the paddle right edge position that is the paddle left position + the paddle object width
      currentScore += 5;
      // If so, increment the score
      score.innerHTML = "Score: " + currentScore;
      //output the score
      return true;
    }
  }
}

function gameOver() {
  cancelAnimationFrame(timer);
  score.innerHTML = " ";
  score.innerHTML += `Game Over! Score: ${currentScore}`;
  score.style.backgroundColor = "rgb(128,0,0)";
}
