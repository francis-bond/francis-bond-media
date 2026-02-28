// ===== NAV SCROLL EFFECT =====
const nav = document.querySelector('.nav');

// Only add scroll-based class toggling on pages that don't start with .scrolled
if (nav && !nav.classList.contains('scrolled')) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  function closeNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// ===== HERO SLIDESHOW =====
const slides = document.querySelectorAll('.hero__slide');

if (slides.length > 1) {
  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// ===== JUSTIFIED GALLERY WITH ORIENTATION GROUPING =====
// Fetches manifest.json to get each image's dimensions and orientation.
// Portrait images are grouped first, landscape second.
// flex-basis is set per item so each image fills its row height at its natural aspect ratio.
(function () {
  var gallery = document.querySelector('.project-gallery');
  if (!gallery) return;
  var firstImg = gallery.querySelector('img');
  if (!firstImg) return;

  // Derive manifest URL from the first image's resolved src
  var manifestUrl = firstImg.src.replace(/\/\d+-full\.jpg$/, '/manifest.json');

  var ROW_HEIGHT = { portrait: 520, landscape: 360 };

  fetch(manifestUrl)
    .then(function (r) { return r.json(); })
    .then(function (manifest) {
      var items = Array.prototype.slice.call(gallery.querySelectorAll('.project-gallery__item'));

      items.forEach(function (item) {
        var img = item.querySelector('img');
        if (!img) return;
        var m = img.src.match(/\/(\d+)-full\.jpg/);
        if (!m) return;
        var data = manifest[m[1]];
        if (!data) return;
        var orient = data.orientation;
        var h = ROW_HEIGHT[orient];
        item.dataset.orientation = orient;
        item.style.height = h + 'px';
        item.style.flexBasis = (h * data.width / data.height) + 'px';
      });

      // Reorder: all portrait items first, then landscape
      var portraits = items.filter(function (i) { return i.dataset.orientation === 'portrait'; });
      var landscapes = items.filter(function (i) { return i.dataset.orientation === 'landscape'; });
      portraits.concat(landscapes).forEach(function (item) { gallery.appendChild(item); });
    })
    .catch(function (e) { console.warn('Gallery manifest not found:', e); });
}());

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger');

if (animatedElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}
