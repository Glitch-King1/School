/**
 * ==========================================================================
 * BRIGHT FUTURE INTERNATIONAL SCHOOL - GALLERY & LIGHTBOX ENGINE
 * ==========================================================================
 * Features:
 * 1. Category Filtering (All, Campus, Classrooms, Sports, Events, Activities)
 * 2. Lightbox viewer with Next, Prev, Close, and ESC key listener
 * 3. Smooth fade & zoom modal
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFiltering();
  initLightbox();
});

/* ==========================================================================
   1. GALLERY FILTERING
   ========================================================================== */
function initGalleryFiltering() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.classList.remove('hide');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.classList.add('hide');
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   2. LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lightbox || !lightboxImg) return;

  let currentGalleryList = [];
  let currentIndex = 0;

  const getVisibleItems = () => {
    return Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
  };

  const openLightbox = (index) => {
    currentGalleryList = getVisibleItems();
    if (currentGalleryList.length === 0) return;

    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const updateLightboxContent = () => {
    const activeItem = currentGalleryList[currentIndex];
    if (!activeItem) return;

    const img = activeItem.querySelector('img');
    const title = activeItem.getAttribute('data-title') || img.getAttribute('alt') || 'School Gallery';

    lightboxImg.src = img.getAttribute('src');
    lightboxImg.alt = title;
    if (lightboxCaption) lightboxCaption.textContent = title;
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % currentGalleryList.length;
    updateLightboxContent();
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    updateLightboxContent();
  };

  // Add click listener to each gallery item
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentGalleryList = getVisibleItems();
      const clickedIndex = currentGalleryList.indexOf(item);
      if (clickedIndex !== -1) {
        openLightbox(clickedIndex);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Close when clicking outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation: ESC, Left Arrow, Right Arrow
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}
