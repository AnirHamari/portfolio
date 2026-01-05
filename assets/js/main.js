/* ===============================
   Portfolio Hamari Anir — JS Optimized
   =============================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio Initialized (Pro Mode)');

  /* ---------------------------------
   * 0) Enforce Dark Mode
   * --------------------------------- */
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');

  /* ---------------------------------
   * 1) Helpers & flags
   * --------------------------------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------
   * 2) Animations au scroll (IntersectionObserver)
   * --------------------------------- */
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const animatedItems = document.querySelectorAll('.animate');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.2 });
    animatedItems.forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.animate').forEach(el => el.classList.add('visible'));
  }

  /* ---------------------------------
   * 3) Lightbox minimaliste (images .lightbox)
   * --------------------------------- */
  const lightboxImgs = document.querySelectorAll('img.lightbox, .project-img.lightbox');
  if (lightboxImgs.length) {
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', background: 'rgba(0,0,0,.9)',
      display: 'grid', placeItems: 'center', zIndex: '1000',
      visibility: 'hidden', opacity: '0', transition: 'opacity .25s ease'
    });
    const img = document.createElement('img');
    Object.assign(img.style, { maxWidth: '92%', maxHeight: '92%', borderRadius: '12px' });
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    function open(src, alt='') {
      img.src = src; img.alt = alt || '';
      overlay.style.visibility = 'visible';
      requestAnimationFrame(() => { overlay.style.opacity = '1'; });
      document.addEventListener('keydown', onKey);
    }
    function close() {
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.visibility = 'hidden'; img.src = ''; }, 200);
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    lightboxImgs.forEach(el => {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => open(el.currentSrc || el.src, el.alt));
    });
    overlay.addEventListener('click', close);
  }

  /* ---------------------------------
   * 4) Formulaire de contact (feedback UX)
   * --------------------------------- */
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('📨 Merci pour votre message ! Je vous réponds dès que possible.');
      form.reset();
    });
  }

  /* ---------------------------------
   * 5) Filtres de projets (data-filter)
   * --------------------------------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const tag = btn.getAttribute('data-filter');
    const cards = document.querySelectorAll('article.project');
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(',').map(s => s.trim());
      card.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
    });
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });

});
