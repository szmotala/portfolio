const hero = $(".hero");
const my_name = $(".my-name");

let canMove = false;

$(window).ready(() => {
  loadStartAnimation();

  $(document).on({
    mousemove: (event) => {
      if (canMove === true) {
        moveHead(100, event);
      }
    },
    mouseenter: (event) => {
      canMove = false;
      moveHead(300, event);
    },
  });

  let text = my_name.text();
  let splitText = text.split("");
  my_name.html("");
  splitText.forEach((t) => {
    let element = moveText(t);
    my_name.append(element);
  });

  fillHashArray();
  stateChangeDetector(1000);

  changeHashResult();
});

function changeHash(hash) {
  window.location.hash = hash;
}
