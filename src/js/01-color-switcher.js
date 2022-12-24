const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.body;
let intervalId = null;

startBtn.addEventListener('click', onStartChangeColor);
stopBtn.addEventListener('click', onStopChangeColor);

// CODE

stopBtn.setAttribute('disabled', true);

//  сет функцій

function onStartChangeColor() {
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');

  bodyEl.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopChangeColor() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
