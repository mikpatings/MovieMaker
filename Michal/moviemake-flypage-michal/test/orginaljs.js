//mision to mars animation
const ballContainer = document.getElementById("ballContainer");

function spawnBalls() {
    for (let i = 0; i < 15; i++) {
        createBall();
    }
}

function createBall() {
    const ball = document.createElement("div");
    ball.classList.add("ball");

    const x = Math.random() * (ballContainer.clientWidth - 20);
    const y = Math.random() * (ballContainer.clientHeight - 20);

    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    ballContainer.appendChild(ball);

    setTimeout(() => {
        ball.remove();
    }, 5000);
}

setInterval(spawnBalls, 1000);