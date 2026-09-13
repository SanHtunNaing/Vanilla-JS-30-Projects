const consoleLog = document.getElementById('consoleLog');
const clearLogsBtn = document.getElementById('clearLogsBtn');
const resetBtn = document.getElementById('resetBtn');

const captureToggle = document.getElementById('captureToggle');
const stopPropToggle = document.getElementById('stopPropToggle');
const onceToggle = document.getElementById('onceToggle');

const toggleGuideBtn = document.getElementById('toggleGuideBtn');
const guideCard = document.getElementById('guideCard');

function logText(e) {
  const className = this.classList[1]; // one, two, or three
  
  const entry = document.createElement('div');
  entry.classList.add('log-entry', className);
  entry.textContent = `⚡ Fired: [DIV: ${className.toUpperCase()}]`;
  
  consoleLog.appendChild(entry);
  consoleLog.scrollTop = consoleLog.scrollHeight;

  // { once: true } ဖြင့် အလုပ်လုပ်သွားပါက UI တွင် EXPIRED အဖြစ် ပြသရန်
  if (onceToggle.checked) {
    this.classList.add('expired');
    const badge = this.querySelector('.status-badge');
    if (badge) badge.textContent = 'EXPIRED (UNBOUND)';
  }

  // Stop Propagation Check
  if (stopPropToggle.checked) {
    e.stopPropagation();
  }
}

function bindEvents() {
  const divs = document.querySelectorAll('.bod-box');
  
  divs.forEach(div => {
    // Reset UI styling
    div.classList.remove('expired');
    const badge = div.querySelector('.status-badge');
    if (badge) badge.textContent = 'ACTIVE';

    // Fresh Event Binding
    div.addEventListener('click', logText, {
      capture: captureToggle.checked,
      once: onceToggle.checked
    });
  });
}

// Initial Bind
bindEvents();

// Manual Reset Event Listeners Button
resetBtn.addEventListener('click', () => {
  // Re-clone stage elements to wipe old listeners completely
  const stage = document.getElementById('stage');
  const newStage = stage.cloneNode(true);
  stage.parentNode.replaceChild(newStage, stage);

  bindEvents();
  
  const entry = document.createElement('div');
  entry.classList.add('log-entry', 'system');
  entry.textContent = '> All Event Listeners Reset & Re-bound!';
  consoleLog.appendChild(entry);
});

// Clear Logs
clearLogsBtn.addEventListener('click', () => {
  consoleLog.innerHTML = '<div class="log-entry system">> Terminal Cleared.</div>';
});

// Toggle Guide
toggleGuideBtn.addEventListener('click', () => {
  guideCard.classList.toggle('hidden');
});
