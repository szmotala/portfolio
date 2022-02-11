const hero = $(".hero");
const my_name = $(".my-name");

let canMove = true;

$(window).ready(() => {
  $(".hero").on({
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
});
