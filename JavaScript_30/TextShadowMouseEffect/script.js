const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const guideCard = document.getElementById('guideCard');
const toggleGuideBtn = document.getElementById('toggleGuideBtn');

const walk = 100; // 100px walk radius for text shadow

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  // Multi-color dynamic text shadow for light background
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(236, 72, 153, 0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(6, 182, 212, 0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(168, 85, 247, 0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(234, 179, 8, 0.7)
  `;
}

// Toggle Study Guide Visibility
toggleGuideBtn.addEventListener('click', () => {
  guideCard.classList.toggle('hidden');
});

hero.addEventListener('mousemove', shadow);
