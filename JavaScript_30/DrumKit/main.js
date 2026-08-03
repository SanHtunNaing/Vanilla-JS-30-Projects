// ==========================================
// 1. Global Variables Setup
// ==========================================
let currentVolume = 0.8; // Default Master Volume (80%)

// ==========================================
// 2. Sound Play Logic (Combined Waves & Volume)
// ==========================================
function playSound(keyData) {
    const audio = document.querySelector(`audio[data-key="${keyData}"]`);
    const key = document.querySelector(`.key[data-key="${keyData}"]`);

    if (!audio || !key) return;

    // အသံအတိုးအကျယ်နှင့် Playhead ပြန်စခြင်း
    audio.volume = currentVolume;
    audio.currentTime = 0;
    audio.play();

    // Key Press Glow Animation ပြန်စရန်
    key.classList.remove('playing');
    void key.offsetWidth; // Trigger reflow for CSS animation reset
    key.classList.add('playing');

    // --- A. Dynamic Ripple Effect (အလယ်မှ ပေါက်ကွဲသည့် လှိုင်း) ---
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    key.appendChild(ripple);

    // --- B. Dynamic Sound Wave Effect (အပြင်သို့ ဖြာထွက်သည့် အသံလှိုင်း) ---
    [0, 100].forEach(delay => {
        setTimeout(() => {
            const wave = document.createElement('span');
            wave.classList.add('sound-wave');
            key.appendChild(wave);

            // Wave Element ပြန်ဖျက်မည်
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
    playSound(e.code);
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

// Slider ဘယ်ဘက် % အထိ အရောင်ဖြည့်ပေးသည့် Function
function updateSliderProgress(val) {
    if (!volumeSlider) return;
    const percentage = val * 100;
    
    // Active Theme အရောင် တွက်ချက်ခြင်း
    const isLight = document.body.classList.contains('light-mode');
    const activeColor = isLight ? '#eab308' : '#00f0ff';
    const trackBg = isLight ? '#e4e4e7' : 'rgba(255, 255, 255, 0.1)';

    // Knob ရဲ့ ဘယ်ဘက်ကို အရောင်လင်းစေပြီး ညာဘက်ကို မီးမှိန်ပေးခြင်း
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
    
    // Theme ပြောင်းလိုက်လျှင် Slider Track Background အရောင်ပါ ချက်ချင်း update ပြုလုပ်ပေးခြင်း
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

// Page Reload လုပ်ချိန်တွင် Saved Theme ပြန်ယူ၍ Slider Fill Sync ပြုလုပ်ခြင်း
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
        
        // Progress Track Background Update ပြုလုပ်ခြင်း
        updateSliderProgress(currentVolume);
        
        // Percent စာလုံး ပြောင်းရန်
        const percentage = Math.round(currentVolume * 100);
        if (volumeValue) volumeValue.textContent = `${percentage}%`;
        
        // Icon အသံအတိုးအကျယ်အလိုက် ပြောင်းရန်
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