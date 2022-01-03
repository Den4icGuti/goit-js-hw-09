import flatpickr from "flatpickr";
import { Notify } from "notiflix";
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  inputRef: document.querySelector('#datetime-picker'),
  btnStartRef: document.querySelector('button[data-start]'),
  timerRef:document.querySelector('.timer'),
  dayRef: document.querySelector('span[data-days]'),
  hourRef: document.querySelector('span[data-hours]'),
  minRef: document.querySelector('span[data-minutes]'),
  secRef:document.querySelector('span[data-seconds]')
}

const { inputRef, btnStartRef, dayRef, hourRef, minRef, secRef } = ref;
btnStartRef.disabled = true;
 btnStartRef.classList.add('disabled')

let useDate = null

const INTERVAL__TIME = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
 console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      Notify.failure("Please choose a date in the future");
    } else { 
      btnStartRef.classList.remove('disabled');
      btnStartRef.disabled = false;

      useDate = selectedDates[0];
    }
  },
};

// console.log(options)

function pad(value) { 
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


class Timer { 
  constructor() { 
    this.isActive = false;
    this.timerId = null;
    btnStartRef.disabled = true;
  }

  start() { 
    if (this.isActive) { 
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = useDate - currentTime;
      const element = convertMs(deltaTime);

      dayRef.textContent = element.days;
      hourRef.textContent = element.hours;
      minRef.textContent = element.minutes;
      secRef.textContent = element.seconds;
      
       if (deltaTime < 0) { 
        this.stop();
        timer.innerHTML = 'Time is over!';
      }
    }, INTERVAL__TIME);

  };
   
  stop() { 
    clearInterval(this.timerId)
  }
}
 
flatpickr(inputRef, options)
const timer = new Timer();
btnStartRef.addEventListener('click', () => timer.start())