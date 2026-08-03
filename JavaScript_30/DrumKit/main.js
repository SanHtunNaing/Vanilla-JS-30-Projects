// ==========================================
// 1. Sound Map & Global Variables Setup
// ==========================================
const soundMap = {
    'KeyA': 'Clap.wav',
    'KeyS': 'HiHat.wav',
    'KeyD': 'Kick.wav',
    'KeyF': 'OpenHat.wav',
    'KeyG': 'Boom.wav',
    'KeyH': 'Ride.wav',
    'KeyJ': 'Snare.wav',
    'KeyK': 'Tom.wav',
    'KeyL': 'Tink.wav'
};

let currentVolume = 0.8; // Default Master Volume (80%)

// ==========================================
// 2. Sound Play Logic (Direct Audio Object)
// ==========================================
function playSound(keyData) {
    const soundFile = soundMap[keyData];
    const key = document.querySelector(`.key[data-key="${keyData}"]`);

    if (!soundFile || !key) return;

    // Direct Audio Instance ဖြင့် Relative Path ပြဿနာကို ရှင်းထားခြင်း
    const audio = new Audio(`./sounds/${soundFile}`);
    audio.volume = currentVolume;
    audio.currentTime = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn("Audio play blocked by browser policies:", error);
        });
    }

    // Key Press Glow Animation
    key.classList.remove('playing');
    void key.offsetWidth; // Trigger reflow for CSS animation reset
    key.classList.add('playing');

    // --- A. Dynamic Ripple Effect ---
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    key.appendChild(ripple);

    // --- B. Dynamic Sound Wave Effect ---
    [0, 100].forEach(delay => {
        setTimeout(() => {
            const wave = document.createElement('span');
            wave.classList.add('sound-wave');
            key.appendChild(wave);

            setTimeout(() => wave.remove(), 400);
        }, delay);
    });

    // Ripple Element နှင့် Active state ဖျက်မည်
    setTimeout(() => {
        ripple.remove();
        key.classList.remove('playing');
    }, 350);
}

// ==========================================
// 3. Keyboard Event Listener
// ==========================================
window.addEventListener('keydown', (e) => {
    let keyData = e.code;
    
    // Numpad သို့မဟုတ် e.key ဖြင့် Fallback လုပ်ခြင်း
    if (!soundMap[keyData]) {
        keyData = `Key${e.key.toUpperCase()}`;
    }

    if (soundMap[keyData]) {
        playSound(keyData);
    }
});

// ==========================================
// 4. Mouse Click Event Listener
// ==========================================
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', function() {
        const keyData = this.getAttribute('data-key');
        playSound(keyData);
    });
});

// ==========================================
// 5. Theme Toggle & Dynamic Slider Sync Logic
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');
const volumeIcon = document.querySelector('.volume-icon');

function updateSliderProgress(val) {
    if (!volumeSlider) return;
    const percentage = val * 100;
    
    const isLight = document.body.classList.contains('light-mode');
    const activeColor = isLight ? '#eab308' : '#00f0ff';
    const trackBg = isLight ? '#e4e4e7' : 'rgba(255, 255, 255, 0.1)';

    volumeSlider.style.background = `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${percentage}%, ${trackBg} ${percentage}%, ${trackBg} 100%)`;
}

function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        document.documentElement.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        document.documentElement.classList.remove('light-mode');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'dark');
    }
    
    if (volumeSlider) {
        updateSliderProgress(volumeSlider.value);
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isLightNow = !document.body.classList.contains('light-mode');
        setTheme(isLightNow);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = (savedTheme === 'light');
    setTheme(isLight);
    
    if (volumeSlider) {
        updateSliderProgress(currentVolume);
    }
});

// ==========================================
// 6. Master Volume Controller Logic
// ==========================================
if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        currentVolume = parseFloat(e.target.value);
        
        updateSliderProgress(currentVolume);
        
        const percentage = Math.round(currentVolume * 100);
        if (volumeValue) volumeValue.textContent = `${percentage}%`;
        
        if (volumeIcon) {
            if (percentage === 0) {
                volumeIcon.textContent = '🔇';
            } else if (percentage < 50) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔊';
            }
        }
    });
}
