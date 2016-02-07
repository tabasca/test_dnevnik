var lesson = document.querySelectorAll(".calendar__lesson--active");
var popup = document.querySelectorAll(".popup");
var close = document.querySelectorAll(".popup__close");

showPopup("calendar__lesson--6_1", "popup--6_1", "right");

showPopup("calendar__lesson--4_5", "popup--4_5", "right");

showPopup("calendar__lesson--2_6", "popup--2_6", "bottom");

showPopup("calendar__lesson--1_2", "popup--1_2", "right");


closePopup();

/**
 * Позиционирует элемент elem относительно элемента anchor, как указано в position.
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

    case "bottom":
      elem.style.left = anchorCoords.left - 1 + "px";
      elem.style.top = anchorCoords.top + anchor.offsetHeight + 1 + "px";
      break;
  }

}

/* Показывает попап на позиции position относительно элемента anchor */

function showPopup(findLesson, findPopup, position) {
  for (var i = 0; i < lesson.length; i++) {
    if (lesson.item(i).classList.contains(findLesson)) {

      var currentLesson = lesson.item(i);

      lesson.item(i).addEventListener("click", function(event) {

        event.preventDefault();

        for (var i = 0; i < popup.length; i++) {
          if (popup.item(i).classList.contains(findPopup)) {

            popup.item(i).classList.add("popup--show");

            positionAt(currentLesson, position, popup.item(i));
          }
        }
      });
    }
  }
}



window.addEventListener("keydown", function(event) {
  if (event.keyCode == 27) {
    for (var i = 0; i < popup.length; i++) {
      if (popup.item(i).classList.contains("popup--show")) {
        popup.item(i).classList.remove("popup--show");
      }
    }
  }
});

function closePopup() {
  for (var i = 0; i < close.length; i++) {
    close.item(i).addEventListener("click", function(event) {
      event.preventDefault();
      for (var i = 0; i < popup.length; i++) {
        popup.item(i).classList.remove("popup--show");
      }
    });
  }
}