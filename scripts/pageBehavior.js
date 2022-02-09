//scroll on touchscreen status
let touchStartPosition;
let touchScroll = false;

//scroll keys
let keys = [33, 34, 32, 38, 40];
let upkeys = [33, 38];
let downkeys = [34, 40];

//scroll state
let scrollPause = false;
let currentPosition = 0;

//array of available hashes filled in refreshHashArray method
let hashes = [];

//current index
let index = 0;

let lastHash, newHash;

function fillHashArray() {
  $("section").each(function () {
    hashes.push(this.id);
  });
}

function refreshIndex() {
  index = hashes.indexOf(window.location.hash.substring(1));
}

//All window methods
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

//Scroll methods
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

//Method called with url hash change
function changeHashResult() {
  $("html, body").scrollTop(currentPosition);
  refreshIndex();
  refreshWindowPostion();
}

//Set window scroll position
function refreshWindowPostion() {
  animateSectionOutro(lastHash);

  changeNavItemState();

  newHash = window.location.hash;
  $("section").each(function () {
    $(this).removeClass("active");
  });

  currentPosition = $(newHash).offset().top;

  animateSectionIntro(newHash);
  $("html, body").animate(
    {
      scrollTop: currentPosition,
    },
    500,
    function () {
      $(newHash).addClass("active");
    }
  );
  lastHash = newHash;
  displayHeader();
}

//Set navbar element active according to current section displayed
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

function displayHeader() {
  if (lastHash !== "#welcome") {
    $(".header").css({
      transform: "translateY(0)",
      opacity: 1,
    });
  } else {
    $(".header").css({
      transform: "translateY(-100%)",
      opacity: 0,
    });
  }
}
