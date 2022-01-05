import { Notify } from "notiflix";

const form = document.querySelector('.form');

form.addEventListener('submit',onFormSubmit)

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);

  for (let position = 0; position < amount; position += 1) {
    createPromise(position, delay)
      .then(({ position,delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay)
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    step += delay;
  }


  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
 
    const valueP = { position, delay };
    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve(valueP)
      } else {
        reject(valueP)
      }
    })

  }
}




