import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let deadline = null;

const startButton = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker')

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

      if (selectedDate <= Date.now()) {
        
       
      iziToast.warning({
        title: 'Invalid Date',
        message: 'Please choose a date in the future',
        position: 'center',
        timeout: 3000,
      });
      startButton.disabled = true;
      deadline = null;
      return;
    }

    deadline = selectedDate;
    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,

  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

    start() {
     startButton.disabled = true;
        datePicker.disabled = true;

    this.intervalId = setInterval(() => {
      const ms = deadline - Date.now();

      if (ms <= 0) {
        this.stop();
        return;
      }

      const timeComponents = this.convertMs(ms);

      this.elements.days.textContent = this.pad(timeComponents.days);
      this.elements.hours.textContent = this.pad(timeComponents.hours);
      this.elements.minutes.textContent = this.pad(timeComponents.minutes);
      this.elements.seconds.textContent = this.pad(timeComponents.seconds);
    }, 1000);
  },

  stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;

      datePicker.disabled = false;
      startButton.disabled = true;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};


  startButton.addEventListener('click', () => timer.start());
