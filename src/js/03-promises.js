import { Notify } from 'notiflix/build/notiflix-notify-aio';

// опції налаштувань Notify
const options = {
  cssAnimationStyle: 'from-top',
  useIcon: false,
};

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

// сет функцій
function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = form.elements;

  let prevDelay = +delay.value;

  setTimeout(() => {
    for (let i = 1; i <= +amount.value; i += 1) {
      createPromise(i, prevDelay)
        .then(({ position, delay }) => {
          Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            options
          );
        })
        .catch(({ position, delay }) => {
          Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`,
            options
          );
        });
      prevDelay += +step.value;
    }
  }, +delay.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
