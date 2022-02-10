const hero = $(".hero");
const my_name = $(".my-name");

let canMove = false;

$(window).ready(() => {
  if (window.location.hash === "") window.location.hash = "welcome";
  if (window.location.hash === "#welcome") loadStartAnimation();
  else $(".slide-in").css({ transform: "translateY(-100%)" });

  $("#welcome").on({
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

function goToSubpage(index) {
  outroSectionAnimation();
  let newPage;

  switch (index) {
    case 1:
      newPage = "blog-project.html";
      break;
    case 2:
      newPage = "photo-portfolio-project.html";
      break;
  }
  window.location.href = newPage;
}
