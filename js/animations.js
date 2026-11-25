/* ============================================
   BREWCART - animations.js
   Scroll animations & extras
   ============================================ */

'use strict';

// Ensure scroll animations re-run on this page
document.addEventListener('DOMContentLoaded', () => {
  // Re-init scroll observer for dynamically added content
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'in-view');
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-wrap').forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }, 500);

  // Admin sidebar nav
  const sidebarLinks = document.querySelectorAll('.admin-sidebar a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const target = link.dataset.section;
      document.querySelectorAll('.admin-section').forEach(s => {
        s.style.display = s.id === `admin-${target}` ? '' : 'none';
      });
      if (typeof showToast === 'function') showToast(`Viewing: ${link.textContent.trim()}`, '📊');
    });
  });
});
