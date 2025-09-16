function myMove() {
    const box = document.getElementById("animate");
    const container = document.getElementById("container");
    let pos = 0;

    const maxPos = container.offsetWidth - box.offsetWidth;

    const id = setInterval(frame, 1); // 1ms interval
    function frame() {
        if (pos >= maxPos) {
            clearInterval(id);
        } else {
            pos++;
            box.style.left = pos + "px";
        }
    }
}
