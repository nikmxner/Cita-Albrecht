// Header: white at the top of the page, transparent once scrolled
const navbar = document.querySelector('.navbar');

if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile navigation toggle
const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navMenu.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link')) navMenu.classList.remove('open');
  });
}

// Testimonial slider: autoplay, arrows, dots
const slider = document.querySelector('.featured-work-slider');

if (slider) {
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(track.children);
  const dotsWrap = slider.querySelector('.slide-nav');
  const AUTOPLAY_MS = 4000;
  let index = 0;
  let timer;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i, manual) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    dots.forEach((d, n) => d.classList.toggle('active', n === index));
    if (manual) restart();
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
  }

  slider.querySelector('.projects-arrow.left').addEventListener('click', () => goTo(index - 1, true));
  slider.querySelector('.projects-arrow:not(.left)').addEventListener('click', () => goTo(index + 1, true));

  goTo(0);
  restart();
}
