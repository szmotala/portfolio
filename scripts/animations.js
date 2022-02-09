function loadStartAnimation() {
  $(".slide-in_img").animate({ opacity: "1" }, 800, function () {
    $(".slide-in_text h1 span").css({ transform: "translateY(0)" });
  });

  setTimeout(() => {
    $(".slide-in_slider").css({ transform: "translateY(-100%)" });

    setTimeout(() => {
      $(".slide-in").css({ transform: "translateY(-100%)" });
    }, 100);
  }, 1700);
}

function moveHead(duration, event) {
  let x, y;

  if (event.pageX !== 0) {
    x = (event.pageX - window.innerWidth / 2) / 25;
  } else {
    x = 0;
  }

  if (event.pageY !== 0) {
    y = (event.pageY - window.innerHeight / 2) / 25;
  } else {
    y = 0;
  }

  $(".hero-section-image")
    .stop(false, true)
    .animate(
      {
        bottom: y,
        right: x,
      },
      duration,
      () => {
        canMove = true;
      }
    );
}

function moveText(text) {
  let element = $(`<span>${text}</span>`);
  element.on({
    mouseenter: () => {
      element.addClass("hovered");
      element.stop(true, false);
      element.animate({ top: "-20", left: "20" }, "fast", function () {
        element.animate({ top: "0", left: "0" }, "fast", function () {
          element.removeClass("hovered");
        });
      });
    },
    mouseleave: () => {
      element.stop(true, true);
    },
  });
  return element;
}

function animateSectionIntro(section) {
  switch (section) {
    case "#welcome":
      setTimeout(function () {
        $(section + " h1").css({
          overflow: "visible",
        });
      }, 1000);
      break;
    default:
      break;
  }
}

function animateSectionOutro(section) {
  switch (section) {
    case "#welcome":
      $(section + " h1").css({
        overflow: "hidden",
      });
      break;
    default:
      break;
  }
}
