/**
 * ==========================================================================
 * BRIGHT FUTURE INTERNATIONAL SCHOOL - EVENTS ENGINE
 * ==========================================================================
 * Features:
 * 1. Filter events by category (All, Academic, Sports, Cultural, Parents)
 * 2. Event details quick-view modal
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initEventFiltering();
  initEventDetailsModal();
});

function initEventFiltering() {
  const filterBtns = document.querySelectorAll('.event-filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (filterBtns.length === 0 || eventCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
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

function initEventDetailsModal() {
  const modal = document.getElementById('eventDetailsModal');
  if (!modal) return;

  const modalTitle = document.getElementById('modalEventTitle');
  const modalDate = document.getElementById('modalEventDate');
  const modalTime = document.getElementById('modalEventTime');
  const modalLocation = document.getElementById('modalEventLocation');
  const modalDesc = document.getElementById('modalEventDesc');
  const closeBtn = document.getElementById('modalEventClose');

  const detailButtons = document.querySelectorAll('.btn-event-details');

  const openModal = (btn) => {
    const card = btn.closest('.event-card');
    if (!card) return;

    const title = card.querySelector('.event-title')?.textContent || 'School Event';
    const desc = card.querySelector('.event-desc')?.textContent || '';
    const date = card.getAttribute('data-full-date') || 'Upcoming Date';
    const time = card.getAttribute('data-time') || '09:00 AM - 02:00 PM';
    const location = card.getAttribute('data-location') || 'Main Campus Auditorium';

    if (modalTitle) modalTitle.textContent = title;
    if (modalDate) modalDate.textContent = date;
    if (modalTime) modalTime.textContent = time;
    if (modalLocation) modalLocation.textContent = location;
    if (modalDesc) modalDesc.textContent = desc;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
