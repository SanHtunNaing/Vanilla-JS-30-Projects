const video = document.querySelector('.player');
const canvas = document.querySelector('.photo-canvas');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snapSound = document.querySelector('.snap-sound');
const snapBtn = document.getElementById('snapBtn');
const toggleGuideBtn = document.getElementById('toggleGuideBtn');
const guideCard = document.getElementById('guideCard');
const filterBtns = document.querySelectorAll('.btn-filter');

let currentFilter = 'normal';

// 1. Get Video Stream from User Webcam
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error('Webcam access denied!', err);
    });
}

// 2. Paint Video to Canvas
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    
    let pixels = ctx.getImageData(0, 0, width, height);

    if (currentFilter === 'redsplit') {
      pixels = redSplit(pixels);
    } else if (currentFilter === 'rgbshift') {
      pixels = rgbShift(pixels);
    }

    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

// Filter 1: Red Split
function redSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50;  // Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

// Filter 2: RGB Shift Effect
function rgbShift(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // Red shift
    pixels.data[i + 500] = pixels.data[i + 1]; // Green shift
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue shift
  }
  return pixels;
}

// 3. Take Photo Snapshot
function takePhoto() {
  snapSound.currentTime = 0;
  snapSound.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'cyber-snap');
  link.innerHTML = `<img src="${data}" alt="Snap" />`;
  strip.insertBefore(link, strip.firstChild);
}

// Event Listeners
video.addEventListener('canplay', paintToCanvas);
snapBtn.addEventListener('click', takePhoto);
toggleGuideBtn.addEventListener('click', () => guideCard.classList.toggle('hidden'));

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
  });
});

getVideo();
