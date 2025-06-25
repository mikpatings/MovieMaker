 /* speed animation */
 const speedEl = document.getElementById("speedmeter");

  let value = 150;
  let direction = 1;

  function updateSpeed() {
    value += direction;
    speedEl.textContent = `${value} KM/H`;

    if (value >= 250) direction = -1;
    else if (value <= 150) direction = 1;
  }

  setInterval(updateSpeed, 45);

/*rotate animation */
const rotateEl = document.getElementById("rotatemeter");
  let angle = 0;
  let angleDirection = 1;

  function updateRotation() {
    angle += angleDirection;
    rotateEl.textContent = `${angle}°`;

    if (angle >= 360) angleDirection = -1;
    else if (angle <= 0) angleDirection = 1;
  }

  setInterval(updateRotation, 10);