"use strict";

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-navbar-toggler]"),
  document.querySelectorAll("[data-navbar-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]"),
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElements(navLinks, "click", closeNav);

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;

let lastActiveLetterBoxIndex = 0;

let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
  for (let i = 0; i < letterBoxes.length; i++) {
    let letterAnimationDelay = 0;

    const letters = letterBoxes[i].textContent.trim();
    letterBoxes[i].textContent = "";

    for (let j = 0; j < letters.length; j++) {
      const span = document.createElement("span");

      span.style.animationDelay = `${letterAnimationDelay}s`;

      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      span.textContent = letters[j];

      if (letters[j] === " ") span.classList.add("space");

      letterBoxes[i].appendChild(span);

      if (j >= letters.length - 1) break;

      letterAnimationDelay += 0.05;
    }

    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }
  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    activeLetterBoxIndex >= letterBoxes.length - 1
      ? (activeLetterBoxIndex = 0)
      : activeLetterBoxIndex++;

    setLetterEffect();
  }, totalLetterBoxDelay * 100 + 3000);
};

window.addEventListener("load", setLetterEffect);

// function isElementInViewport(el) {
//   const rect = el.getBoundingClientRect();
//   console.log("slide-in2 rect:", rect);
//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   );
// }

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  console.log("slide-in2 rect:", rect);

  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right > 0
  );
}

function checkVisibility() {
  const elements = document.querySelectorAll(".slide-in");
  const elementsTwo = document.querySelectorAll(".slide-in2");

  elements.forEach((el) => {
    if (isElementInViewport(el)) {
      el.classList.add("visible");
    }
    // else {
    //   el.classList.remove("visible");
    // }
  });

  elementsTwo.forEach((el) => {
    if (isElementInViewport(el)) {
      el.classList.add("active");
    }
    // else {
    //   el.classList.remove("ative");
    // }
  });
}
window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);
