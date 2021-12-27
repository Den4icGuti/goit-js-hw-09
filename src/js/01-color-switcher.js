const refs = {
btnStr:document.querySelector("button[data-start]"),
btnStop:document.querySelector("button[data-stop]"),
body:document.querySelector('body')
}

const { btnStr, btnStop, body } = refs;

btnStr.disabled = false;
btnStop.disabled = false;

const DELAY_INTERVAL = 1000

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorBody() { 
  body.style.background = getRandomHexColor()
}

btnStr.addEventListener('click', startChangeColor);
btnStop.addEventListener('click',stopChangeColor)

function startChangeColor() { 
  btnStr.disabled = true;
  btnStop.disabled = false;
 timerId = setInterval(changeColorBody,DELAY_INTERVAL)
}

function stopChangeColor() { 
  btnStr.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
}