/**
 * Modern Custom Video Player Component
 */
class VideoPlayer {
    constructor(container) {
      // 1. Element Selection
      this.container = container;
      this.video = container.querySelector('.player__video');
      this.progress = container.querySelector('.progress');
      this.progressBar = container.querySelector('.progress__filled');
      this.toggleBtn = container.querySelector('.toggle');
      this.skipButtons = container.querySelectorAll('[data-skip]');
      this.ranges = container.querySelectorAll('.player__slider');
      this.timeDisplay = container.querySelector('.player__time');
      this.fullscreenBtn = container.querySelector('.fullscreen-btn');
      this.speedLabel = container.querySelector('.speed-label');
  
      // 2. State
      this.isMouseDown = false;
  
      // 3. Initialize Component
      this.init();
    }
  
    init() {
      this.bindEvents();
      this.updateTimeDisplay();
    }
  
    bindEvents() {
      // Play/Pause Events
      this.video.addEventListener('click', () => this.togglePlay());
      this.toggleBtn.addEventListener('click', () => this.togglePlay());
      this.video.addEventListener('play', () => this.updatePlayButton());
      this.video.addEventListener('pause', () => this.updatePlayButton());
  
      // Progress Events
      this.video.addEventListener('timeupdate', () => this.handleProgress());
      this.progress.addEventListener('click', (e) => this.scrub(e));
      this.progress.addEventListener('mousemove', (e) => this.isMouseDown && this.scrub(e));
      this.progress.addEventListener('mousedown', () => (this.isMouseDown = true));
      this.progress.addEventListener('mouseup', () => (this.isMouseDown = false));
  
      // Controls Events
      this.skipButtons.forEach((btn) =>
        btn.addEventListener('click', (e) => this.skip(e))
      );
      this.ranges.forEach((range) => {
        range.addEventListener('change', (e) => this.handleRangeUpdate(e));
        range.addEventListener('mousemove', (e) => this.handleRangeUpdate(e));
      });
  
      // Fullscreen Event
      this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
  
      // Keyboard Shortcuts Navigation
      this.container.addEventListener('keydown', (e) => this.handleKeyShortcuts(e));
    }
  
    togglePlay() {
      const method = this.video.paused ? 'play' : 'pause';
      this.video[method]();
    }
  
    updatePlayButton() {
      const icon = this.video.paused
        ? '<i class="fa-solid fa-play"></i>'
        : '<i class="fa-solid fa-pause"></i>';
      this.toggleBtn.innerHTML = icon;
    }
  
    skip(e) {
      const skipTime = parseFloat(e.currentTarget.dataset.skip);
      this.video.currentTime += skipTime;
    }
  
    handleRangeUpdate(e) {
      const input = e.target;
      this.video[input.name] = input.value;
  
      if (input.name === 'playbackRate') {
        this.speedLabel.textContent = `${input.value}x`;
      }
    }
  
    handleProgress() {
      const percent = (this.video.currentTime / this.video.duration) * 100;
      this.progressBar.style.flexBasis = `${percent}%`;
      this.updateTimeDisplay();
    }
  
    scrub(e) {
      const scrubTime =
        (e.offsetX / this.progress.offsetWidth) * this.video.duration;
      this.video.currentTime = scrubTime;
    }
  
    formatTime(seconds) {
      if (isNaN(seconds)) return '00:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  
    updateTimeDisplay() {
      const current = this.formatTime(this.video.currentTime);
      const total = this.formatTime(this.video.duration);
      this.timeDisplay.textContent = `${current} / ${total}`;
    }
  
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        this.container.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  
    handleKeyShortcuts(e) {
      // Prevent scrolling when pressing Spacebar
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === 'ArrowLeft') {
        this.video.currentTime -= 5;
      } else if (e.code === 'ArrowRight') {
        this.video.currentTime += 5;
      } else if (e.code === 'KeyF') {
        this.toggleFullscreen();
      }
    }
  }
  
  // Instantiate Player when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const playerContainer = document.querySelector('.player-container');
    if (playerContainer) {
      new VideoPlayer(playerContainer);
    }
  });
