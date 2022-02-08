let touchStartPosition;
let touchScroll = false;

let keys = [33, 34, 32, 38, 40];
let upkeys = [33, 38];
let downkeys = [34, 40];

let scrollPause = false;
let currentPosition = 0;

let hashes = [];

let index = 0;

function fillHashArray() {
  $("section").each(function () {
    hashes.push(this.id);
  });
}

function refreshIndex() {
  index = hashes.indexOf(window.location.hash.substring(1));
}

function stateChangeDetector(scrollDelay) {
  $(window).on({
    wheel: function (event) {
      if (scrollPause === false)
        if (event.originalEvent.wheelDelta > 0) {
          scrollUp(scrollDelay);
        } else {
          scrollDown(scrollDelay);
        }
    },

    touchstart: function (event) {
      if (event.touches.length > 1) {
        touchScroll = false;
      } else {
        touchScroll = true;
        touchStartPosition = event.touches[0].pageY;
      }
    },

    touchend: function (event) {
      if (scrollPause === false) {
        if (touchScroll === true) {
          let touchEndPosition = event.changedTouches[0].pageY;

          if (touchStartPosition > touchEndPosition + 20) {
            scrollDown(scrollDelay);
          } else if (touchStartPosition < touchEndPosition - 20) {
            scrollUp(scrollDelay);
          }
        }
      }
    },

    keydown: function (event) {
      if (scrollPause === false) {
        if (keys.includes(event.keyCode)) {
          if (upkeys.includes(event.keyCode)) {
            scrollUp(scrollDelay);
          } else {
            scrollDown(scrollDelay);
          }
        }
      }
    },

    hashchange: function () {
      changeHashResult();
    },

    resize: function () {
      currentPosition = $(`${window.location.hash}`).offset().top;
      $("html, body").scrollTop(currentPosition);
    },
  });
}

function scrollUp(delay) {
  scrollPause = true;
  if (index > 0) {
    index -= 1;
  }

  window.location.hash = hashes[index];
  $("html, body").scrollTop(currentPosition);

  setTimeout(function () {
    scrollPause = false;
  }, delay);
}

function scrollDown(delay) {
  scrollPause = true;
  if (index < hashes.length - 1) {
    index += 1;
  }

  window.location.hash = hashes[index];
  $("html, body").scrollTop(currentPosition);

  setTimeout(function () {
    scrollPause = false;
  }, delay);
}

function changeHashResult() {
  $("html, body").scrollTop(currentPosition);
  refreshIndex();
  refreshWindowPostion();
}

function refreshWindowPostion() {
  changeNavItemState();
  $("section").each(function () {
    $(this).removeClass("active");
  });

  currentPosition = $(`#${hashes[index]}`).offset().top;
  $("html, body").animate(
    {
      scrollTop: currentPosition,
    },
    500,
    function () {
      $(`#${hashes[index]}`).addClass("active");
    }
  );
}

function changeNavItemState() {
  let j = 0;
  $(".right-navi .nav-item .item").each(function () {
    $(this).removeClass("active");
    if (j === index) $(this).addClass("active");
    j++;
  });

  j = 0;
  $(".left-navi .nav-item .item").each(function () {
    $(this).removeClass("active");
    if (j === index) $(this).addClass("active");
    j++;
  });
}
