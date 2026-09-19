const tallyBtn = document.getElementById('tallyBtn');
const resetBtn = document.getElementById('resetBtn');
const toggleGuideBtn = document.getElementById('toggleGuideBtn');
const guideCard = document.getElementById('guideCard');
const totalDisplay = document.getElementById('totalDisplay');
const timeResult = document.getElementById('timeResult');

// 1. Tally Function
function calculateTotalTime() {
  const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

  const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
      const [mins, secs] = timeCode.split(':').map(parseFloat);
      return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds, 0);

  let secondsLeft = seconds;
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  timeResult.textContent = `${hours}h ${mins}m ${secondsLeft}s`;
  totalDisplay.classList.remove('hidden');
}

// 2. Reset Function
function resetTally() {
  totalDisplay.classList.add('hidden');
  timeResult.textContent = '00:00:00';
}

// Event Listeners
tallyBtn.addEventListener('click', calculateTotalTime);
resetBtn.addEventListener('click', resetTally);
toggleGuideBtn.addEventListener('click', () => {
  guideCard.classList.toggle('hidden');
});
