let availableWidth;
let availableHeight;
let GameArea;
let main;

const initialize = () => {
  availableHeight = window.innerHeight;
  availableWidth = window.innerWidth;

  gameArea = document.querySelector("#gameArea");
  main = document.querySelector("#main");
  main = `${availableHeight - 50}px`;
  gameArea.style.width = `${availableWidth - 40}px`;
  gameArea.style.height = `${availableHeight}px`;
  gameArea.style.margin = "auto";
};
// First is initialize the GameArea
window.addEventListener("load", initialize());
window.addEventListener("resize", initialize());
