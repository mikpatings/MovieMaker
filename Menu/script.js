function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  const date = now.toISOString().split('T')[0];

  document.getElementById('clockTime').textContent = time;
  document.getElementById('clockDate').textContent = date;
}

setInterval(updateClock, 1);
updateClock();

