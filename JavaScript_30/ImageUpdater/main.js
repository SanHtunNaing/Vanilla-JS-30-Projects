const inputs = document.querySelectorAll('.controls input:not([type="file"])');
const uploadBtn = document.querySelector('#upload-btn');
const downloadBtn = document.querySelector('#download-btn');
const resetBtn = document.querySelector('#reset-btn');
const image = document.querySelector('#target-img');
const colorPicker = document.querySelector('#base');
const paletteBtns = document.querySelectorAll('.palette-btn');

const rotateBtn = document.querySelector('#rotate-btn');
const flipHBtn = document.querySelector('#flip-h-btn');
const flipVBtn = document.querySelector('#flip-v-btn');
const ratioBtns = document.querySelectorAll('.ratio-btn');
const dropZone = document.querySelector('#drop-zone');

let currentRotation = 0;
let scaleH = 1;
let scaleV = 1;
let selectedRatio = 'original';

// Default values for reset
const DEFAULTS = {
  spacing: '12',
  blur: '0',
  brightness: '100',
  contrast: '100',
  saturate: '100',
  base: '#00b4d8'
};

// Handle Input Sliders & Colors
function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

// Reset Settings Function
function resetSettings() {
  // 1. Reset Sliders and Color Picker Values
  document.querySelector('#spacing').value = DEFAULTS.spacing;
  document.querySelector('#blur').value = DEFAULTS.blur;
  document.querySelector('#brightness').value = DEFAULTS.brightness;
  document.querySelector('#contrast').value = DEFAULTS.contrast;
  document.querySelector('#saturate').value = DEFAULTS.saturate;
  colorPicker.value = DEFAULTS.base;

  // 2. Reset CSS Variables
  document.documentElement.style.setProperty('--spacing', `${DEFAULTS.spacing}px`);
  document.documentElement.style.setProperty('--blur', `${DEFAULTS.blur}px`);
  document.documentElement.style.setProperty('--brightness', `${DEFAULTS.brightness}%`);
  document.documentElement.style.setProperty('--contrast', `${DEFAULTS.contrast}%`);
  document.documentElement.style.setProperty('--saturate', `${DEFAULTS.saturate}%`);
  document.documentElement.style.setProperty('--base', DEFAULTS.base);

  // 3. Reset Transforms (Rotate / Flip)
  currentRotation = 0;
  scaleH = 1;
  scaleV = 1;
  document.documentElement.style.setProperty('--rotate', '0deg');
  document.documentElement.style.setProperty('--scaleH', '1');
  document.documentElement.style.setProperty('--scaleV', '1');

  // 4. Reset Aspect Ratio
  selectedRatio = 'original';
  document.documentElement.style.setProperty('--aspect-ratio', 'auto');
  ratioBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ratio === 'original');
  });

  // 5. Recalculate Dynamic Background
  if (image.complete) {
    updateDynamicBackground(image);
  }
}

// Rotate Image
function handleRotate() {
  currentRotation = (currentRotation + 90) % 360;
  document.documentElement.style.setProperty('--rotate', `${currentRotation}deg`);
}

// Flip Horizontal
function handleFlipH() {
  scaleH = scaleH === 1 ? -1 : 1;
  document.documentElement.style.setProperty('--scaleH', scaleH);
}

// Flip Vertical
function handleFlipV() {
  scaleV = scaleV === 1 ? -1 : 1;
  document.documentElement.style.setProperty('--scaleV', scaleV);
}

// Aspect Ratio Change
function handleRatioChange() {
  ratioBtns.forEach(btn => btn.classList.remove('active'));
  this.classList.add('active');

  selectedRatio = this.dataset.ratio;
  let cssRatio = 'auto';

  if (selectedRatio === '1:1') cssRatio = '1 / 1';
  else if (selectedRatio === '4:5') cssRatio = '4 / 5';
  else if (selectedRatio === '16:9') cssRatio = '16 / 9';

  document.documentElement.style.setProperty('--aspect-ratio', cssRatio);
}

// Dynamic BG Calculation
function updateDynamicBackground(imgElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 50;
  canvas.height = 50;
  ctx.drawImage(imgElement, 0, 0, 50, 50);
  
  const imageData = ctx.getImageData(0, 0, 50, 50).data;
  let r = 0, g = 0, b = 0, count = 0;
  
  for (let i = 0; i < imageData.length; i += 16) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
    count++;
  }
  
  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  const darkR = Math.max(0, Math.floor(r * 0.25));
  const darkG = Math.max(0, Math.floor(g * 0.25));
  const darkB = Math.max(0, Math.floor(b * 0.25));

  const lightR = Math.min(255, Math.floor(r * 1.1));
  const lightG = Math.min(255, Math.floor(g * 1.1));
  const lightB = Math.min(255, Math.floor(b * 1.2));

  document.body.style.background = `linear-gradient(135deg, rgb(${darkR}, ${darkG}, ${darkB}) 0%, rgb(${r}, ${g}, ${b}) 60%, rgb(${lightR}, ${lightG}, ${lightB}) 100%)`;
}

// Process Image File (Shared by File Input & Drag-and-Drop)
function processFile(file) {
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(event) {
      image.src = event.target.result;
      
      // Reset settings on new image load
      resetSettings();
    };
    reader.readAsDataURL(file);
  }
}

// File Upload Handler
function handleImageUpload(e) {
  processFile(e.target.files[0]);
}

// Drag & Drop Handlers
['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('drag-over');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('drag-over');
  }, false);
});

dropZone.addEventListener('drop', (e) => {
  const dt = e.dataTransfer;
  const files = dt.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
});

// Apply Preset Themes
function applyPresetTheme() {
  const selectedColor = this.dataset.color;
  const selectedBg = this.dataset.bg;

  document.documentElement.style.setProperty('--base', selectedColor);
  colorPicker.value = selectedColor;
  document.body.style.background = selectedBg;
}

// Download Image
function downloadEditedImage() {
  const spacingInput = document.querySelector('#spacing');
  const blurInput = document.querySelector('#blur');
  const brightnessInput = document.querySelector('#brightness');
  const contrastInput = document.querySelector('#contrast');
  const saturateInput = document.querySelector('#saturate');

  const spacing = parseInt(spacingInput.value, 10) || 0;
  const blur = parseInt(blurInput.value, 10) || 0;
  const brightness = brightnessInput.value || 100;
  const contrast = contrastInput.value || 100;
  const saturate = saturateInput.value || 100;
  const baseColor = colorPicker.value;

  const originalWidth = image.naturalWidth || image.width;
  const originalHeight = image.naturalHeight || image.height;

  let targetWidth = originalWidth;
  let targetHeight = originalHeight;

  if (selectedRatio === '1:1') {
    const minDim = Math.min(originalWidth, originalHeight);
    targetWidth = minDim;
    targetHeight = minDim;
  } else if (selectedRatio === '4:5') {
    targetWidth = originalWidth;
    targetHeight = Math.round((originalWidth * 5) / 4);
  } else if (selectedRatio === '16:9') {
    targetWidth = originalWidth;
    targetHeight = Math.round((originalWidth * 9) / 16);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const scale = originalWidth / image.clientWidth;
  const realSpacing = Math.round(spacing * scale);
  const realBlur = Math.round(blur * scale);

  canvas.width = targetWidth + realSpacing * 2;
  canvas.height = targetHeight + realSpacing * 2;

  // 1. Draw Border Box
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Translate Context & Apply Filters
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((currentRotation * Math.PI) / 180);
  ctx.scale(scaleH, scaleV);

  let filters = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
  if (realBlur > 0) {
    filters += ` blur(${realBlur}px)`;
  }
  ctx.filter = filters;

  ctx.drawImage(image, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
  ctx.restore();

  // 3. Download Trigger
  const link = document.createElement('a');
  link.download = `edited-image.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Listeners
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
paletteBtns.forEach(btn => btn.addEventListener('click', applyPresetTheme));
ratioBtns.forEach(btn => btn.addEventListener('click', handleRatioChange));
uploadBtn.addEventListener('change', handleImageUpload);
downloadBtn.addEventListener('click', downloadEditedImage);
resetBtn.addEventListener('click', resetSettings);

rotateBtn.addEventListener('click', handleRotate);
flipHBtn.addEventListener('click', handleFlipH);
flipVBtn.addEventListener('click', handleFlipV);

// Initial Run
if (image.complete) {
  updateDynamicBackground(image);
} else {
  image.onload = () => updateDynamicBackground(image);
}