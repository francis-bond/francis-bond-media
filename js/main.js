// ===== IMAGE RIGHT-CLICK PROTECTION =====
document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

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

// ===== PROJECT GALLERY LAYOUT =====
// Builds a row-based justified layout from manifest.json data.
// Rules: max 3 portraits per row, max 2 landscapes per row,
// mixed rows (1P + 1L) use portrait height. Rows with fewer images are centered.
(function () {
  var gallery = document.querySelector('.project-gallery');
  if (!gallery) return;
  var firstImg = gallery.querySelector('img');
  if (!firstImg) return;

  var manifestUrl = firstImg.src.replace(/\/\d+-full\.jpg$/, '/manifest.json');

  fetch(manifestUrl)
    .then(function (r) { return r.json(); })
    .then(function (manifest) {
      var containerWidth = gallery.offsetWidth || window.innerWidth;
      var isMobile = containerWidth < 768;
      var GAP = isMobile ? 8 : 12;
      var MAX_H = isMobile ? 320 : 700;

      // Collect items with their manifest data
      var allItems = [];
      gallery.querySelectorAll('.project-gallery__item').forEach(function (el) {
        var img = el.querySelector('img');
        if (!img) return;
        var m = img.src.match(/\/(\d+)-full\.jpg/);
        if (!m) return;
        var d = manifest[m[1]];
        if (!d) return;
        allItems.push({ el: el, w: d.width, h: d.height, orient: d.orientation });
      });

      var portraits = allItems.filter(function (i) { return i.orient === 'portrait'; });
      var landscapes = allItems.filter(function (i) { return i.orient === 'landscape'; });

      // Build row groups (arrays of items)
      var rows = buildRows(portraits.slice(), landscapes.slice());

      // Rebuild gallery DOM with explicit row divs
      while (gallery.firstChild) gallery.removeChild(gallery.firstChild);

      rows.forEach(function (rowItems) {
        var rowEl = document.createElement('div');
        rowEl.className = 'gallery-row';

        var totalGaps = (rowItems.length - 1) * GAP;
        var sumRatios = rowItems.reduce(function (s, i) { return s + i.w / i.h; }, 0);
        var rowH = Math.min((containerWidth - totalGaps) / sumRatios, MAX_H);

        rowItems.forEach(function (item) {
          item.el.className = 'gallery-row__item';
          item.el.style.width = Math.round(rowH * item.w / item.h) + 'px';
          item.el.style.height = Math.round(rowH) + 'px';
          rowEl.appendChild(item.el);
        });

        gallery.appendChild(rowEl);
      });
    })
    .catch(function (e) { console.warn('Gallery manifest not found:', e); });

  // Deterministic row-building algorithm.
  // Pattern: portrait rows (alternating 3/2) with a mixed or landscape row
  // inserted every 2 portrait rows for visual variety.
  function buildRows(p, l) {
    var rows = [];
    var pBatch = 3;
    var breakCount = 0;

    while (p.length > 0 || l.length > 0) {
      if (p.length === 0) {
        rows.push(l.splice(0, Math.min(2, l.length)));
      } else if (l.length === 0) {
        rows.push(p.splice(0, Math.min(pBatch, p.length)));
        pBatch = pBatch === 3 ? 2 : 3;
      } else if (breakCount >= 2) {
        // Insert variety: alternate between mixed and landscape-only rows
        if (breakCount % 2 === 0) {
          rows.push([p.shift(), l.shift()]); // mixed: 1P + 1L
        } else {
          rows.push(l.splice(0, Math.min(2, l.length))); // landscape row
        }
        breakCount = 0;
      } else {
        rows.push(p.splice(0, Math.min(pBatch, p.length)));
        pBatch = pBatch === 3 ? 2 : 3;
        breakCount++;
      }
    }
    return rows;
  }
}());

// ===== LIGHTBOX =====
(function () {
  var gallery = document.querySelector('.project-gallery');
  if (!gallery) return;

  // Create lightbox DOM
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML =
    '<button class="lightbox__close" aria-label="Close">&times;</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&lsaquo;</button>' +
    '<img class="lightbox__img" src="" alt="">' +
    '<button class="lightbox__nav lightbox__nav--next" aria-label="Next">&rsaquo;</button>';
  document.body.appendChild(lightbox);

  var lbImg = lightbox.querySelector('.lightbox__img');
  var images = [];
  var currentIndex = 0;

  function collectImages() {
    images = Array.prototype.slice.call(gallery.querySelectorAll('img'));
  }

  function open(index) {
    collectImages();
    if (!images.length) return;
    currentIndex = index;
    lbImg.src = images[currentIndex].src;
    lbImg.alt = images[currentIndex].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function show(index) {
    currentIndex = ((index % images.length) + images.length) % images.length;
    lbImg.src = images[currentIndex].src;
    lbImg.alt = images[currentIndex].alt;
  }

  // Open on image click/tap
  gallery.addEventListener('click', function (e) {
    var img = e.target.tagName === 'IMG' ? e.target : e.target.querySelector('img');
    if (!img) return;
    collectImages();
    var idx = images.indexOf(img);
    if (idx !== -1) open(idx);
  });

  // Close button
  lightbox.querySelector('.lightbox__close').addEventListener('click', close);

  // Nav buttons
  lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', function (e) {
    e.stopPropagation();
    show(currentIndex - 1);
  });
  lightbox.querySelector('.lightbox__nav--next').addEventListener('click', function (e) {
    e.stopPropagation();
    show(currentIndex + 1);
  });

  // Close on backdrop click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  // Keyboard nav
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  // Swipe support
  var touchStartX = 0;
  var touchStartY = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx > 0) show(currentIndex - 1);
    else show(currentIndex + 1);
  }, { passive: true });
}());

// ===== STATS SECTION PARALLAX =====
(function () {
  var section = document.querySelector('.stats-section');
  var bg = document.querySelector('.stats__parallax-bg');
  if (!section || !bg || window.innerWidth < 768) return;

  var RANGE = 80; // px the background travels top-to-bottom

  function updateParallax() {
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight;
    var sh = section.offsetHeight;
    // progress: 0 when section bottom enters viewport, 1 when section top exits at top
    var entered = vh - rect.top;
    var progress = Math.max(0, Math.min(1, entered / (vh + sh)));
    // translateY: -RANGE shows bottom of image, +RANGE shows top of image
    var y = RANGE * (2 * progress - 1);
    bg.style.transform = 'translateY(' + y + 'px)';
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
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
