let timer;
let running = false;
let startTime;
let elapsed = 0;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap'); // Lap button
const lapsList = document.getElementById('laps'); // UL to hold laps

startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsed;
    timer = setInterval(updateDisplay, 100);
  }
});

pauseBtn.addEventListener('click', () => {
  running = false;
  clearInterval(timer);
  elapsed = Date.now() - startTime;
});

resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(timer);
  elapsed = 0;
  display.textContent = '00:00:00';
  lapCount = 0;
  lapsList.innerHTML = ''; // clear previous laps
});

lapBtn.addEventListener('click', () => {
  if (!running) return; // Don't record if not running
  lapCount++;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${display.textContent}`;
  lapsList.appendChild(lapItem);
});

function updateDisplay() {
  elapsed = Date.now() - startTime;
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
  const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

  display.textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}
