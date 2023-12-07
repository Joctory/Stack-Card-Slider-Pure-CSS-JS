let stack = document.querySelector(".stack");
let cards = document.querySelectorAll(".card");
let totalcards = cards.length;

document.addEventListener("DOMContentLoaded", function () {
  loadcard();

  var mc = new Hammer(stack);
  mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
  mc.on("swipeleft", function (ev) {
    nextleft();
  });

  mc.on("swiperight", function (ev) {
    nextright();
  });

  mc.on("swipeup", function (ev) {
    prevup();
  });

  mc.on("swipedown", function (ev) {
    prevup();
  });
});

function loadcard() {
  var bullet = document.querySelector(".mktp-pagination");
  cards.forEach(function (card, index) {
    const zindex = totalcards - index;
    card.style.zIndex = zindex;
    card.setAttribute("data-seq", zindex);
    if (zindex == totalcards) {
      card.classList.add("active");
      // Create pagination
      const newbullet = document.createElement("div");
      newbullet.classList.add("button");
      newbullet.classList.add("active");
      newbullet.setAttribute("id", "bullet-" + zindex);
      newbullet.setAttribute("active", "true");
      bullet.appendChild(newbullet);
      card.style.filter = `blur(0px)`;
    } else {
      card.classList.remove("active");
      // Create pagination
      const newbullet = document.createElement("div");
      newbullet.classList.add("button");
      newbullet.setAttribute("id", "bullet-" + zindex);
      newbullet.setAttribute("active", "false");
      bullet.appendChild(newbullet);
      var blur = 0.25 * (5 - zindex);
      card.style.filter = `blur(${blur}px)`;
    }
  });
  cardscss();
}

function updateZIndex() {
  cards.forEach((card, index) => {
    let currseq = card.getAttribute("data-seq");
    // Add or remove "active" class based on z-index
    if (currseq == totalcards) {
      card.classList.add("active");
      card.style.filter = `blur(0px)`;
    } else {
      card.classList.remove("active");
      var blur = 0.25 * (5 - currseq);
      card.style.filter = `blur(${blur}px)`;
    }
    cardscss();
  });
}

function cardscss() {
  cards.forEach((card, index) => {
    const cendiv = Math.round(cards.length / 2);
    let currseq = card.getAttribute("data-seq");
    // Add or remove "active" class based on z-index
    if (currseq > cendiv) {
      var mult = currseq - cendiv;
      var scale = 1 + 0.05 * mult;
      var y = `calc(-50% + ${10 * mult}px)`;
    } else if (currseq == cendiv) {
      var scale = 1;
      var y = `calc(-50%)`;
    } else if (currseq < cendiv) {
      var mult = currseq - cendiv;
      var scale = 1 + 0.05 * mult;
      var y = `calc(-50% + ${10 * mult}px)`;
    }

    card.style.setProperty("--y", y);
    card.style.transform = `translate(-50%, var(--y)) scale(${scale})`;
  });
}

function nextleft() {
  const lastZIndex = parseInt(cards[cards.length - 1].style.zIndex);

  cards.forEach((card, index) => {
    let currseq = card.getAttribute("data-seq");
    if (currseq == totalcards) {
      card.style.animation = "swapleft 700ms forwards";
      setTimeout(() => {
        card.style.animation = "";
        setTimeout(() => updateZIndex(), 10);
        cardscss();
      }, 700);
    }
  });

  setTimeout(() => {
    for (let i = cards.length - 1; i > 0; i--) {
      const currentZIndex = parseInt(cards[i - 1].style.zIndex);
      cards[i].style.zIndex = currentZIndex;
      cards[i].setAttribute("data-seq", currentZIndex);
    }
    cards[0].style.zIndex = lastZIndex;
    cards[0].setAttribute("data-seq", lastZIndex);
  }, 350);
  nextbullet();
}

function nextright() {
  const lastZIndex = parseInt(cards[cards.length - 1].style.zIndex);

  cards.forEach((card, index) => {
    let currseq = card.getAttribute("data-seq");
    if (currseq == totalcards) {
      card.style.animation = "swapright 700ms forwards";
      setTimeout(() => {
        card.style.animation = "";
        setTimeout(() => updateZIndex(), 10);
        cardscss();
      }, 700);
    }
  });

  setTimeout(() => {
    for (let i = cards.length - 1; i > 0; i--) {
      const currentZIndex = parseInt(cards[i - 1].style.zIndex);
      cards[i].style.zIndex = currentZIndex;
      cards[i].setAttribute("data-seq", currentZIndex);
    }
    cards[0].style.zIndex = lastZIndex;
    cards[0].setAttribute("data-seq", lastZIndex);
  }, 350);
  nextbullet();
}

function prevup() {
  const firstZIndex = parseInt(cards[0].style.zIndex);

  cards.forEach((card, index) => {
    let currseq = card.getAttribute("data-seq");
    if (currseq == 1) {
      card.style.animation = "swapup 600ms forwards";
      setTimeout(() => {
        card.style.animation = "";
        setTimeout(() => updateZIndex(), 10);
        cardscss();
      }, 700);
    }
  });

  setTimeout(() => {
    for (let i = 0; i < cards.length - 1; i++) {
      const currentZIndex = parseInt(cards[i + 1].style.zIndex);
      cards[i].style.zIndex = currentZIndex;
      cards[i].setAttribute("data-seq", currentZIndex);
    }
    cards[cards.length - 1].style.zIndex = firstZIndex;
    cards[cards.length - 1].setAttribute("data-seq", firstZIndex);
  }, 700);
  previousbullet();
}

function prevdown() {
  const firstZIndex = parseInt(cards[0].style.zIndex);

  cards.forEach((card, index) => {
    let currseq = card.getAttribute("data-seq");
    if (currseq == 1) {
      card.style.animation = "swapdown 600ms forwards";
      setTimeout(() => {
        card.style.animation = "";
        setTimeout(() => updateZIndex(), 10);
        cardscss();
      }, 700);
    }
  });

  setTimeout(() => {
    for (let i = 0; i < cards.length - 1; i++) {
      const currentZIndex = parseInt(cards[i + 1].style.zIndex);
      cards[i].style.zIndex = currentZIndex;
      cards[i].setAttribute("data-seq", currentZIndex);
    }
    cards[cards.length - 1].style.zIndex = firstZIndex;
    cards[cards.length - 1].setAttribute("data-seq", firstZIndex);
  }, 700);
  previousbullet();
}

function nextbullet() {
  var activebullet = document.querySelector("[active='true']");
  var nextbullet = activebullet.nextSibling;

  // Check if there is a next sibling
  if (nextbullet) {
    activebullet.setAttribute("active", "false");
    nextbullet.setAttribute("active", "true");
    activebullet.classList.remove("active");
    nextbullet.classList.add("active");
  } else {
    // If there is no next sibling, loop back to the first button
    var firstbullet = document.querySelector(".button:first-child");
    activebullet.setAttribute("active", "false");
    firstbullet.setAttribute("active", "true");
    activebullet.classList.remove("active");
    firstbullet.classList.add("active");
  }
}

function previousbullet() {
  var activebullet = document.querySelector("[active='true']");
  var previousbullet = activebullet.previousSibling;

  // Check if there is a previous sibling
  if (previousbullet) {
    activebullet.setAttribute("active", "false");
    previousbullet.setAttribute("active", "true");
    activebullet.classList.remove("active");
    previousbullet.classList.add("active");
  } else {
    // If there is no previous sibling, loop back to the last button
    var lastbullet = document.querySelector(".button:last-child");
    activebullet.setAttribute("active", "false");
    lastbullet.setAttribute("active", "true");
    activebullet.classList.remove("active");
    lastbullet.classList.add("active");
  }
}
