/**
 * Scroll Reveal Animation Manager
 */
class ScrollRevealer {
    constructor(selector) {
      this.images = document.querySelectorAll(selector);
      this.observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.2
      };
  
      this.init();
    }
  
    init() {
      if (!('IntersectionObserver' in window)) {
        this.images.forEach(img => img.classList.add('active'));
        return;
      }
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      }, this.observerOptions);
  
      this.images.forEach(image => observer.observe(image));
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new ScrollRevealer('.slide-image');
  });
