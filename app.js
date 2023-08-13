import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

console.log("hello!.js");
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
let drag = false; // variable if the user is dragging
let score = document.querySelector("#score");
let menu = document.querySelector(".menu");
let innerMenu = document.querySelector("#inner-menu");
let easy = document.querySelector("#Easy");
let medium = document.querySelector("#Medium");
let hard = document.querySelector("#Hard");
let sound = document.querySelector("#sound");
let color = document.querySelector("#color");
let start = document.querySelector("#start");
let pause = document.querySelector("#pause");
let restart = document.querySelector("#restart");
let music = document.querySelector("#music-icon");
let message = document.querySelector("#message");
let isInnerMenuShowing = false;
let isGameOver = false;
let isbgMusicOn = false;
let bgColors = [
  "#e7eaf6",
  "#edf7fa",
  "#f9ecec",
  "#fcf8f3",
  "#fbeeff",
  "#faf5e4",
  "#ecfeff",
];
let lists = document.querySelectorAll("li");
let messages = [
  "Keep Going!",
  "Wowza!",
  "Amazing!",
  "Great Job!",
  "Incredible!",
  "Awesome!",
  "Fantastic!",
  "Super!",
  "Wow!",
  "Holy Smokes!",
  "Look at you!",
  "You're a Pro!",
];
let textContainer = [
  document.querySelector("#title"),
  document.querySelector("#title-image"),
  document.querySelector("#message"),
];
let isMuted = false;
//prettier-ignore
let startSound = new Audio("https://github.com/m-soro/Project_1/raw/main/sound/start.wav");
//prettier-ignore
let ballTap = new Audio("https://github.com/m-soro/Project_1/raw/main/sound/ball-tap.wav");
//prettier-ignore
let ballTapWall = new Audio("https://github.com/m-soro/Project_1/raw/main/sound/ball-tap-wall.wav");
//prettier-ignore
let gameOverSound = new Audio("https://github.com/m-soro/Project_1/raw/main/sound/game-over.wav");
//prettier-ignore
let click = new Audio("https://github.com/m-soro/Project_1/raw/main/sound/click.wav");
//prettier-ignore
let bgMusic = new Audio("https://github.com/m-soro/Project_1/raw/main/sound/hey!.mp3");
//prettier-ignore
let bell = new Audio("https://github.com/m-soro/Project_1/raw/main/sound/happyBell.wav")
bgMusic.loop = true;
let soundEffects = [
  startSound,
  ballTap,
  ballTapWall,
  gameOverSound,
  click,
  bell,
];
bell.volume = 0.9;
bgMusic.volume = 0.4;
startSound.volume = 0.3;
ballTap.volume = 0.4;
ballTapWall.volume = 0.2;
gameOverSound.volume = 0.3;

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
  ballObject = new Ball("ball","100px",`${randomBallPosition}px`,"absolute","16px","16px","8px","#270245",3,3); // velocityX and VelocityY
  //prettier-ignore
  paddleObject = new Paddle("paddle","25px",`${randomPaddlePosition}px`,"absolute","25px","65px","#ff2941",48); // speed of paddle movement
  //create ball object
  let ball = ballObject.createBall();
  //create objects
  let paddle = paddleObject.createPaddle();

  gameArea.appendChild(paddle);
  gameArea.appendChild(ball);
  ball.style.display = "none"; // hide the ball to start so you can't position your paddle yet!

  //Add the Key Listeners
  document.addEventListener("keydown", arrowKeysListener, false);

  // Event Listeners for mouse and touch events
  // Only one paddle so these event listners can be attached in to the screen
  document.addEventListener("mousedown", mouseDown, false);
  document.addEventListener("mousemove", mouseMove, false);
  document.addEventListener("mouseup", mouseUp, false);

  // add mouse events for touch
  gameArea.addEventListener("touchstart", mouseDown, false);
  gameArea.addEventListener("touchmove", mouseMove, false);
  gameArea.addEventListener("touchend", mouseUp, false);

  // menu options
  menu.addEventListener("click", menuShow, false);
  lists.forEach((list) => list.addEventListener("click", () => click.play()));

  //prettier-ignore
  easy.addEventListener("click", (event) => selectMode(event.target.id),false);
  //prettier-ignore
  medium.addEventListener("click", (event) => selectMode(event.target.id), false);
  //prettier-ignore
  hard.addEventListener("click", (event) => selectMode(event.target.id), false);
  sound.addEventListener("click", toggleSoundEffects, false);
  color.addEventListener("click", changeBackground, false);

  // Game Play Options
  // prettier-ignore
  start.addEventListener("click",() => (timer = requestAnimationFrame(play) && (ball.style.display = "block"))); // start and display the ball
  pause.addEventListener("click", () => cancelAnimationFrame(timer));
  restart.addEventListener("click", () => document.location.reload());
  music.addEventListener("click", (event) => {
    playBgMusic(event), false;
  });
}

function playBgMusic(event) {
  isbgMusicOn = !isbgMusicOn;
  if (isbgMusicOn) {
    event.target.innerText = "music_note";
    bgMusic.muted = false;
    bgMusic.play();
    let fadePoint = bgMusic.duration - 10;
    function reduceVolume() {
      if (bgMusic.currentTime >= fadePoint && bgMusic.volume != 0.0) {
        bgMusic.volume -= 0.09;
      } else {
        bgMusic.volume = 0.4;
      }
    }
    setInterval(reduceVolume, 400);
  } else {
    event.target.innerText = "music_off";
    bgMusic.muted = true;
  }
}

// For the change background color button, I want to be able to cycle through the options one at a time each click
// Instead of just assigning random colors.To do this I will use a generator function that will yield each color every click.
// This soultion is a bit hacky but it works I will generate a massive colors array so the user can click 2500 times each game
// before the color defaults to white color LOL!
function* backgroundColorGenerator() {
  let megaColorsArray = [];
  for (let i = 0; i < 500; i++) {
    megaColorsArray.push(...bgColors);
  }
  yield* megaColorsArray;
}

let colorIterator = backgroundColorGenerator();

function changeBackground() {
  main.style.backgroundColor = colorIterator.next().value;
}

function toggleSoundEffects() {
  hideInnerMenu();
  isMuted = !isMuted;
  if (isMuted === true) {
    soundEffects.forEach((soundEffect) => (soundEffect.muted = true));
  } else {
    ballTap.play();
    soundEffects.forEach((soundEffect) => (soundEffect.muted = false));
  }
}

function hideInnerMenu() {
  setTimeout(() => innerMenu.classList.toggle("hide"), 300);
}

// Modes increases the ball velocity x and y
function selectMode(selected) {
  //  if current score is not zero or the ball is still in the DOM hidden, then prompt the user to restart
  if (currentScore !== 0 || ballObject.topPosition > gameAreaHeight - 30) {
    score.innerText = `Re start the game first!`;
    hideInnerMenu();
  } else {
    score.innerText = `${selected} mode selected!`;
    score.style.backgroundColor = "#0a0044";
    hideInnerMenu();
    startSound.play();
    selected == "Easy"
      ? (ballObject.velocityX = 3 && (ballObject.velocityY = 3))
      : selected == "Medium"
      ? (ballObject.velocityX = 5 && (ballObject.velocityY = 5))
      : selected == "Hard"
      ? (ballObject.velocityX = 7 && (ballObject.velocityY = 7))
      : null;
  }
}

function arrowKeysListener(event) {
  // convert the strings to ints first
  paddleObject.leftPosition = parseInt(paddleObject.leftPosition);
  paddleObject.width = parseInt(paddleObject.width);

  if (event.key === "ArrowLeft") {
    paddleObject.leftPosition -= paddleObject.paddleVelocity;
    // Smaller number on the left x axis, if paddle is nearing the edge of the screen to the left position it exactly at 10, there is margin of 10 on each side
    if (paddleObject.leftPosition < 10) paddleObject.leftPosition = 10;
  } else if (event.key == "ArrowRight") {
    paddleObject.leftPosition += paddleObject.paddleVelocity;
    // This checks if the starting edge of the paddle div is going over the available width minus the paddle width
    // if so, the position of the paddle should be set to the available with minus 75, if I hard code 65 which is the
    // paddle width, it goes over? so I'm putting 75 here
    if (paddleObject.leftPosition > availableWidth - 65)
      paddleObject.leftPosition = availableWidth - 75;
  }
  const paddle = document.querySelector("#paddle");
  paddle.style.left = `${paddleObject.leftPosition}px`;
}

function menuShow() {
  isInnerMenuShowing = !isInnerMenuShowing;
  if (isInnerMenuShowing) {
    innerMenu.classList.toggle("hide");
    cancelAnimationFrame(timer);
  } else {
    timer = requestAnimationFrame(play);
    hideInnerMenu();
  }
}

function everyNthScore() {
  let randMessIndex = Math.floor(Math.random() * messages.length);
  if (currentScore >= 20) {
    if (currentScore % 20 == 0) {
      message.innerText = messages[randMessIndex];
      message.style.display = "block";
      setTimeout(() => (message.style.display = "none"), 5000);
    }
  }
  if (currentScore % 100 == 0) {
    bell.play();
  }
}

function play() {
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
  } else if (ballObject.topPosition >= gameAreaHeight - 25) {
    // Has the ball top position passed the paddle?
    ball.style.backgroundColor = "#bc2525";
  } else {
    ball.style.backgroundColor = "#270245";
  }
}

function collisionDetection() {
  console.log();
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
    ballTapWall.play();
    return true;
  }
  return false;
}

function collisionY() {
  // checks if ball hits the top position
  if (ballObject.topPosition < 4) {
    ballTapWall.play();
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
      ballTap.play()
      everyNthScore();
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
  score.style.backgroundColor = "#bc2525";
  // the game is still checking the ball position even after game over
  // this at least gives me a one more buffer before encountering the game over bug.
  isGameOver = !isGameOver;
  if (isGameOver) gameOverSound.play();
}

function mouseUp(event) {
  drag = false;
}
function mouseDown(event) {
  drag = true;
}

function mouseMove(event) {
  // for some reason, the drag doesn't work unless I simulate a key press before start
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));

  // if the flag is true then the MoseDown is fired and the mouse Up is not
  if (drag) {
    // to prevent mouse and touch move fire at the same time
    event.preventDefault();
    // get the value of the location of the touch event
    // if its a mouse event get it from :
    paddleObject.leftPosition =
      event.clientX - 33 || event.targetTouches[0].pageX - 33; // the 32 will move the paddle to the middle of where the mouse event occurs
    // check to make sure paddle stays in the playing area
    if (paddleObject.leftPosition < 10) {
      paddleObject.leftPosition = 10; // if paddleLeft is less than zero, then move the paddle to left. Prevents the paddle from moving to the left edge of the screen
    }
    //check if paddle is overflowing to the right side of the screen
    // if paddle is greater than the playing Area width minus 64 (the paddle width) + 10 px buffer to the edge
    if (paddleObject.leftPosition > availableWidth - 75) {
      paddleObject.leftPosition = availableWidth - 75; // then assign it to the right most part of the screen
    }
    let paddle = document.querySelector("#paddle");
    paddle.style.left = paddleObject.leftPosition + "px";
  }
}

// Some Fun Font Styling!
function changeHue(textElement) {
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    const color = `hsl(${hue}, 90%, 70%)`;
    textElement.style.color = color;
  }, 50);
}

textContainer.forEach((text) => changeHue(text));
