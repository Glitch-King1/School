/**
 * ==========================================================================
 * BRIGHT FUTURE INTERNATIONAL SCHOOL - MAIN JAVASCRIPT ENGINE
 * ==========================================================================
 * Features:
 * 1. Preloader fade-out
 * 2. Sticky & Glassmorphic Navigation
 * 3. Mobile Hamburger Menu with auto-close
 * 4. Active Nav link state detection
 * 5. Animated Number Counters on Scroll (IntersectionObserver)
 * 6. Testimonials Carousel / Slider (Auto-play, touch-friendly, dots, prev/next)
 * 7. FAQ Accordion system
 * 8. Scroll Reveal Animations
 * 9. Floating Back-to-Top button
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileNav();
  initActiveNavLink();
  initScrollCounters();
  initTestimonialsSlider();
  initFaqAccordion();
  initScrollReveal();
  initBackToTop();
});

/* ==========================================================================
   1. PRELOADER
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 350);
    });
    // Fallback if window load takes too long
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
      }
    }, 2000);
  }
}

/* ==========================================================================
   2. STICKY HEADER & NAVBAR SCROLL EFFECT
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
    document.body.style.overflow = navMenu.classList.contains('is-active') ? 'hidden' : '';
  };

  const closeMenu = () => {
    hamburger.classList.remove('is-active');
    navMenu.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   4. ACTIVE NAV LINK DETECTION
   ========================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   5. ANIMATED STATISTICS COUNTERS
   ========================================================================== */
function initScrollCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const countToTarget = () => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quartic function
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.round(target * easeOut);

      counter.textContent = currentVal.toLocaleString();

      if (frame < totalFrames) {
        requestAnimationFrame(countToTarget);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(countToTarget);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   6. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideTimer = null;
  const slideCount = slides.length;

  // Generate dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('data-index', i);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slideCount - 1;
    if (currentIndex >= slideCount) currentIndex = 0;
    updateSlider();
    resetAutoSlide();
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Auto-play
  const startAutoSlide = () => {
    autoSlideTimer = setInterval(nextSlide, 6000);
  };

  const resetAutoSlide = () => {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    startAutoSlide();
  };

  // Pause on hover
  track.addEventListener('mouseenter', () => {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  });
  track.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = parentItem.classList.contains('active');

      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const itemContent = item.querySelector('.accordion-content');
        if (itemContent) itemContent.style.maxHeight = null;
      });

      // If clicked wasn't active, open it
      if (!isActive) {
        parentItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      }
    });
  });
}

/* ==========================================================================
   8. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
