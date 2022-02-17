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

// const backgrounds = [
//   "linear-gradient(115.44deg,#1572b6 -11.05%, #000000 34.42%,#333333 82.91%, #ff7a00 108.24%)",
//   "linear-gradient(116.71deg, #4E3B2F -3.9%, #6C7273 102.03%)",
//   "linear-gradient(116.27deg, #BBBBBB -4.29%, #000000 91.95%)",
//   "linear-gradient(119.54deg, #034883 -12.4%, #1D1816 17.73%, #705E4D 79.11%, #6B6D59 109.62%)",
//   "linear-gradient(115.44deg,#1572b6 -11.05%, #000000 34.42%,#333333 82.91%, #ff7a00 108.24%)",
// ];

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
  setTimeout(function () {
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
      500
    );
    lastHash = newHash;
  }, 200);
}

//Set navbar element active according to current section displayed
function changeNavItemState() {
  $(".right-navi .nav-item .item").each(function (j) {
    $(this).removeClass("active");
    if (j === index) $(this).addClass("active");
  });

  $(".left-navi .nav-item .item").each(function (j) {
    $(this).removeClass("active");
    if (j === index) $(this).addClass("active");
  });
}

function outroSectionAnimation() {
  $(`${window.location.hash}`).removeClass("active");
}
