let timerDisplay = document.getElementById('timer');
let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');
let modeButtons = document.querySelectorAll('.mode');

let focusTime = 25 * 60; // default 25 min
let breakTime = 5 * 60;  // default 5 min
let timeLeft = focusTime;
let timerInterval = null;
let onBreak = false;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      onBreak = !onBreak;
      timeLeft = onBreak ? breakTime : focusTime;
      updateDisplay();
      startTimer(); // auto start next session
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = onBreak ? breakTime : focusTime;
  updateDisplay();
}

// Switch mode buttons
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    focusTime = parseInt(btn.dataset.focus) * 60;
    breakTime = parseInt(btn.dataset.break) * 60;
    onBreak = false;
    timeLeft = focusTime;
    updateDisplay();
  });
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
