var calendar = document.querySelector(".calendar");
var lesson = document.querySelector(".calendar__lesson--1_7");
var popup = document.querySelector(".popup--1_7");
var close = document.querySelector(".popup__close");

// var close = document.querySelector(".search-hotel-close");

/**
 * Позиционирует элемент elem относительно элемента anchor, как указано в
 * в position.
 *
 * @param {Node} anchor     Элемент-якорь, относительно которого задана позиция
 * @param {string} position Позиция: одно из (top/right/bottom)
 * @param {Node} elem       Элемент, который будет позиционирован
 *
 * Оба элемента elem && anchor должны быть видимы в документе.
 */
function positionAt(anchor, position, elem) {

  var anchorCoords = anchor.getBoundingClientRect();

  switch (position) {
    // case "top":
    //   elem.style.left = anchorCoords.left + "px";
    //   elem.style.top = anchorCoords.top - elem.offsetHeight + "px";
    //   break;

    case "right":
      elem.style.left = anchorCoords.left + anchor.offsetWidth + 1 +"px";
      elem.style.top = anchorCoords.bottom - elem.offsetHeight + "px";
      break;

    // case "bottom":
    //   elem.style.left = anchorCoords.left + "px";
    //   elem.style.top = anchorCoords.top + anchor.offsetHeight + "px";
    //   break;
  }

}

/**
 * Показывает попап на позиции position
 * относительно элемента anchor
 */
lesson.addEventListener("click", function(event) {

  event.preventDefault();
  popup.classList.add("popup--show");

  positionAt(lesson, "right", popup);

  return false;
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 27) {
    if (popup.classList.contains("popup--show")) {
      popup.classList.remove("popup--show");
    }
  }
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("popup--show");
});