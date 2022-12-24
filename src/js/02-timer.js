import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

//вибірка елементів сторінки
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let futureTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureTime = selectedDates[0].getTime();
    const startTime = Date.now();
    const deltaTime = futureTime - startTime;
    if (deltaTime > 0) {
      startBtn.removeAttribute('disabled');
    } else startBtn.setAttribute('disabled', true);
  },
};
flatpickr('#datetime-picker', options); // ініціалізація календаря

// додаємо прослуховувача
startBtn.addEventListener('click', onStartBtnClick);

//  Код
startBtn.setAttribute('disabled', true);

const timer = {
  start() {
    setInterval(() => {
      const startTime = Date.now();
      const deltaTime = futureTime - startTime;

      const time = convertMs(deltaTime);
      updateClockFace(time);
    }, 1000);
  },
};

// сет функцій

function onStartBtnClick() {
  timer.start();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = formatingOutputDays(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function formatingOutputDays(value) {
  if (String(value).length <= 2) {
    return String(value).padStart(2, '0');
  }
  return String(value);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
