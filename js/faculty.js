/**
 * ==========================================================================
 * BRIGHT FUTURE INTERNATIONAL SCHOOL - FACULTY DIRECTORY ENGINE
 * ==========================================================================
 * Features:
 * 1. Filter faculty cards by department (All, Primary, Middle, Senior, Leadership)
 * 2. Animated card transitions
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initFacultyFiltering();
});

function initFacultyFiltering() {
  const filterBtns = document.querySelectorAll('.faculty-filter-btn');
  const facultyCards = document.querySelectorAll('.faculty-card');

  if (filterBtns.length === 0 || facultyCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      facultyCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}
