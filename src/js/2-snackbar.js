import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');
const delayInput = document.querySelector('[name = "delay"]');
const stateRadios = document.querySelectorAll('input[name="state"]');


function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const selectedState = [...stateRadios].find((radio) => radio.checked)?.value;



  createPromise(delay, selectedState)
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Rejected',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });
});
