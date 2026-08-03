const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  // 1. စက္ကန့် လက်တံ
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  // 2. မိနစ် လက်တံ
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  // 3. နာရီ လက်တံ
  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// 1 စက္ကန့်တိုင်း (1000ms) မှာ setDate function ကို run မယ်
setInterval(setDate, 1000);

// Page စပွင့်တာနဲ့ တန်းပေါ်အောင် တစ်ကြိမ် တန်း ခေါ်ပေးထားမယ်
setDate();

const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // ခလုတ်စာသားနှင့် Icon လဲလှယ်ခြင်း
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.innerHTML = '🌙 Dark';
  } else {
    themeBtn.innerHTML = '💡 Light';
  }
});