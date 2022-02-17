let slider_t1 = new TimelineMax();
let text_t1 = new TimelineMax();

function loadStartAnimation() {
  slider_t1
    .from($(".slide-in_img"), 0.6, { css: { opacity: 0 } })
    .to(
      $(".slide-in_text h1 span"),
      0.5,
      {
        y: "-=100%",
      },
      "-=0.5"
    )
    .to($(".slide-in"), 0.2, { y: "-=100%" }, "+=0.5");
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
  let t1 = new TimelineMax();

  switch (section) {
    case "#welcome":
      t1.to($(".hero-section-image img"), { css: { opacity: 0.2 } }, 0.5)
        .to($(section + " .section-text .my-name"), { y: 0 }, 0.5)
        .to($(section + " .section-text p span"), { y: 0 }, 0.5, "+=0.5")
        .set($(section + " h1"), { css: { overflow: "visible" } }, "+=0.5");

      break;

    default:
      t1.to($(section + " .section-image-content"), { opacity: 1, x: 0 }, 0.5)
        .to($(section + " .section-title span"), { y: 0 }, 0.5)
        .to($(section + " .main-cta-wrapper"), { y: 0 }, 0.5, "-=0.3")
        .set($(section + " .button-content"), {
          css: { overflow: "visible" },
        })
        .fromTo($(".social-media-links"), { scale: 0 }, { scale: 1 }, 0.5);

      setTimeout(function () {
        $(section + " .section__decoration").addClass("active");
      }, 500);

      break;
  }
}

function animateSectionOutro(section) {
  let t1 = new TimelineMax();

  switch (section) {
    case "#welcome":
      t1.to($(".hero-section-image img"), { css: { opacity: 0 } }, 0.4)
        .to(
          $(section + " .section-text .my-name"),
          { y: "+=100%" },
          0.3,
          "-=0.4"
        )
        .to($(section + " .section-text p span"), { y: "+=100%" }, 0.3, "-=0.4")
        .set($(section + " h1"), { css: { overflow: "hidden" } });

      break;

    default:
      t1.to(
        $(section + " .section-image-content"),
        { opacity: 0, x: "-=100%" },
        0.5
      )
        .to($(section + " .section-title span"), { y: "+=100%" }, 0.5)
        .to($(section + " .main-cta-wrapper"), { y: "+=100%" }, 0.5, "-=0.3")
        .set($(section + " .button-content"), {
          css: { "overflow-y": "hidden" },
        })
        .to($(".social-media-links"), { scale: 0 }, 0.5, "-=2");

      setTimeout(function () {
        $(section + " .section__decoration").removeClass("active");
      }, 500);

      break;
  }
}
