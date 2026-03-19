let interval = null;

function myMove() {
  if (interval) return;

  const box = document.getElementById("animate");
  const container = document.getElementById("container");
  const maxLeft = container.offsetWidth - box.offsetWidth;

  let pos = 0;

  interval = setInterval(() => {
    if (pos >= maxLeft) {
      clearInterval(interval);
      interval = null;
    } else {
      pos += 1;
      box.style.left = pos + "px";
    }
  }, 1);
}
