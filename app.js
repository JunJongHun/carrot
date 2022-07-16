const startBtn = document.querySelector(".game__start");

const field = document.querySelector(".game__field");

function initGame() {
  for (let i = 0; i < 5; i++) {
    field.append(createItem("./img/carrot.png", "carrot"));
    field.append(createItem("./img/bug.png", "bug"));
  }
}

function createItem(src, className) {
  const ITEM_SIZE = 80;
  const fieldRect = field.getBoundingClientRect();
  let top = Math.random() * (fieldRect.height - ITEM_SIZE);
  let left = Math.random() * (fieldRect.width - ITEM_SIZE);

  let item = document.createElement("img");
  item.setAttribute("class", className);
  item.setAttribute("src", src);
  item.style.position = "absolute";
  item.style.top = `${top}px`;
  item.style.left = `${left}px`;

  return item;
}

const OnStartBtn = () => {
  initGame();
};

startBtn.addEventListener("click", OnStartBtn);
