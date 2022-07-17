const startBtn = document.querySelector(".game__start");
const timer = document.querySelector(".game__timer");
const count = document.querySelector(".game__count");
const field = document.querySelector(".game__field");
const popUp = document.querySelector(".pop-up");
const reStart = document.querySelector(".pop-up__restart");
const message = document.querySelector(".pop-up__message");

const ITEM_SIZE_WIDTH = 80;
const ITEM_SIZE_HEIGHT = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
let GAME_TIME = 5;

let timeCheck = undefined;
let started = false;

function initGame() {
  field.innerHTML = "";
  count.innerText = CARROT_COUNT;
  createItem(CARROT_COUNT, "carrot", "./img/carrot.png");
  createItem(BUG_COUNT, "bug", "./img/bug.png");
}

function createItem(count, className, src) {
  let { top, left, bottom, right } = field.getBoundingClientRect();
  bottom -= ITEM_SIZE_HEIGHT;
  right -= ITEM_SIZE_WIDTH;
  for (let i = 0; i < count; i++) {
    let x = randomPoint(top, bottom);
    let y = randomPoint(left, right);

    let item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", src);
    item.style.position = "absolute";
    item.style.top = `${x}px`;
    item.style.left = `${y}px`;
    field.append(item);
  }

  return;
}

function randomPoint(min, max) {
  return Math.random() * (max - min);
}

function startGameTimer() {
  let nowTime = GAME_TIME;
  updateTimer(nowTime);
  timeCheck = setInterval(() => {
    if (nowTime <= 0) {
      clearInterval(timeCheck);
      return;
    }
    updateTimer(--nowTime);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timeCheck);
}

function updateTimer(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timer.innerText = `${minutes}:${seconds}`;
}

function startGame() {
  changeStartBtn();
  showTiemrAndCount();
  startGameTimer();
  initGame();
}

function stopGame() {
  stopGameTimer();
  hideStartBtn();
  showPopUp("RePlay?");
}

function changeStartBtn() {
  startBtn.innerHTML = `<i class="fa-solid fa-stop">`;
}

function hideStartBtn() {
  startBtn.style.visibility = "hidden";
}

function showStartBtn() {
  startBtn.style.visibility = "visible";
}

function showTiemrAndCount() {
  timer.style.visibility = "visible";
  count.style.visibility = "visible";
}

function changeStarted() {
  started = started ? false : true;
}

function showPopUp(text) {
  popUp.classList.remove("hide");
  message.innerText = text;
}

function hidePopUp() {
  popUp.classList.add("hide");
}

const OnStartBtn = () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  changeStarted();
};

const replay = () => {
  showStartBtn();
  hidePopUp();
};

startBtn.addEventListener("click", OnStartBtn);
reStart.addEventListener("click", replay);
