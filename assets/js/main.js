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

    function open(src, alt = '') {
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
   * 4) Scroll Reveal Observer (Dynamisme Max)
   * --------------------------------- */
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---------------------------------
   * 5) Bouton Copier (Presse-papier)
   * --------------------------------- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.querySelector('.btn-text').textContent;
        btn.classList.add('copied');
        btn.querySelector('.btn-text').textContent = 'Copié !';
        btn.querySelector('.btn-icon').textContent = '✔️';

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.querySelector('.btn-text').textContent = originalText;
          btn.querySelector('.btn-icon').textContent = '📋';
        }, 2000);
      });
    });
  });

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

  /* ---------------------------------
   * 6) Données et Chargement des projets
   * --------------------------------- */
  const PROJECTS_DATA = {
    "professional": [
      {
        "id": "altair-gestion",
        "title": "Plateforme de Gestion Scolaire",
        "emoji": "🧩",
        "badge": "Stage Altair",
        "tags": ["web"],
        "summary": "Refonte complète d'une application de suivi parents-élèves (Django/React). Migration d'architecture legacy vers moderne.",
        "image": "assets/images/projects/altair.jpg",
        "objective": "Moderniser et sécuriser l'accès aux données scolaires.",
        "tech": "Django REST, React.js, PostgreSQL, Docker",
        "links": [
          {
            "label": "📄 Rapport (PDF)",
            "url": "rpt.pdf",
            "download": true
          }
        ]
      },
      {
        "id": "iot-monitor",
        "title": "Surveillance Environnementale Connectée",
        "emoji": "🌡️",
        "badge": "IoT",
        "tags": ["iot"],
        "summary": "Conception d'un nœud de capteurs autonome pour la surveillance en temps réel.",
        "image": "assets/images/projects/iot.jpg",
        "objective": "Monitoring environnemental temps réel.",
        "tech": "ESP32, MQTT, Node-RED, InfluxDB"
      },
      {
        "id": "access-control",
        "title": "Contrôle d'Accès Industriel",
        "emoji": "🚪",
        "badge": "Automatisme",
        "tags": ["automatisme"],
        "summary": "Système automatisé de gestion d'ouverture sécurisée en milieu industriel.",
        "image": "assets/images/projects/access.jpg",
        "objective": "Sécuriser les accès industriels via PLC.",
        "tech": "TIA Portal (Siemens), Unity Pro (Schneider)"
      },
      {
        "id": "tri-carrousel",
        "title": "Chaîne de Tri Automatisée",
        "emoji": "⚙️",
        "badge": "Industrie 4.0",
        "tags": ["automatisme"],
        "summary": "Pilotage d'un système de tri de pièces par matière et couleur avec IHM.",
        "image": "assets/images/projects/carrousel.jpg",
        "objective": "Optimisation des processus de tri.",
        "tech": "API Siemens, IHM KTP700",
        "links": [
          {
            "label": "📄 Dossier Tech",
            "url": "hamari_Technique_Carrousel.pdf",
            "download": true
          }
        ]
      },
      {
        "id": "ai-ethics",
        "title": "Les enjeux de l'Intelligence Artificielle",
        "emoji": "🤖⚖️",
        "badge": "Rapport académique",
        "tags": ["web"],
        "summary": "Synthèse des enjeux éthiques de l'IA : biais algorithmiques, impacts sociétaux et régulation 🧠⚖️",
        "image": "assets/images/ai-ethics-thumb.png",
        "objective": "Analyser les défis éthiques et réglementaires de l'IA.",
        "tech": "Recherche documentaire, analyse critique",
        "links": [
          {
            "label": "📄 Télécharger (PDF)",
            "url": "lesenjeuxd'artificielle.pdf",
            "download": true
          }
        ]
      },
      {
        "id": "sae-gestion-robot",
        "title": "SAE — Gestion de projet (Robot)",
        "emoji": "🗂️📅",
        "badge": "SAE / Gestion",
        "tags": ["automatisme"],
        "summary": "Planification et organisation d'un projet robotique avec suivi des tâches 📊🤖",
        "image": "assets/images/sae-gestion-thumb.png",
        "objective": "Gérer un projet robotique de A à Z.",
        "tech": "Diagramme de Gantt, gestion de tâches",
        "links": [
          {
            "label": "📄 Compte rendu (PDF)",
            "url": "CRautoSAEGUEYE-HAMARI.pdf",
            "download": true
          }
        ]
      },
      {
        "id": "projet-capteur",
        "title": "Projet CAPTEUR — Compte rendu",
        "emoji": "📡📈",
        "badge": "SAE / Capteur",
        "tags": ["iot"],
        "summary": "Projet capteur avec acquisition de données, analyse et interprétation 📊🔬",
        "image": "assets/images/capteur-thumb.png",
        "objective": "Mettre en œuvre un système d'acquisition de données.",
        "tech": "Capteurs, acquisition de données, analyse",
        "links": [
          {
            "label": "📄 Télécharger (PDF)",
            "url": "Compte Rendu du Projet CAPTEUR.pdf",
            "download": true
          }
        ]
      },
      {
        "id": "tp-matlab",
        "title": "TP MATLAB — FFT & intégration numérique",
        "emoji": "📊🧮",
        "badge": "TP / Calcul",
        "tags": ["web"],
        "summary": "Génération de signaux, transformée de Fourier, intégration numérique 📈✨",
        "image": "matlab-project.png",
        "objective": "Maîtriser le traitement du signal numérique.",
        "tech": "MATLAB, FFT, intégration/dérivation numérique"
      },
      {
        "id": "projet-reseaux",
        "title": "Projet Réseaux — Diagnostic & connectivité",
        "emoji": "🌐🧰",
        "badge": "Réseau",
        "tags": ["iot"],
        "summary": "Tests de connectivité réseau et diagnostic avec commandes système 🔌📡",
        "image": "reseaux.png",
        "objective": "Diagnostiquer et résoudre des problèmes réseau.",
        "tech": "Ping, commandes réseau, diagnostic"
      },
      {
        "id": "app-vbnet",
        "title": "Application de gestion scolaire — VB",
        "emoji": "🧑🏫🗃️",
        "badge": "Projet applicatif",
        "tags": ["web"],
        "summary": "Gestion scolaire avec authentification multi-rôles et gestion des notes 📚👨‍🎓",
        "image": "vbnet-project.png",
        "objective": "Développer une application de gestion complète.",
        "tech": "VB.NET, Visual Studio, WinForms, SQL"
      }
    ]
  };

  function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    PROJECTS_DATA.professional.forEach(project => {
      const article = createProjectCard(project);
      container.appendChild(article);
    });

    // Réappliquer les animations
    if (!prefersReduced && 'IntersectionObserver' in window) {
      const newProjects = container.querySelectorAll('.animate');
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }
      }, { threshold: 0.2 });
      newProjects.forEach(el => io.observe(el));
    }
  }

  function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'project animate';
    article.setAttribute('data-tags', project.tags.join(','));

    let linksHtml = '';
    if (project.links && project.links.length > 0) {
      linksHtml = '<div class="cta-row">' +
        project.links.map(link =>
          `<a class="btn ${link.download ? 'btn-primary' : 'btn-outline'}" 
              href="${link.url}" 
              target="_blank" 
              rel="noopener"
              ${link.download ? 'download' : ''}>
            ${link.label}
          </a>`
        ).join('') +
        '</div>';
    }

    article.innerHTML = `
      <div class="project-header">
        <h2>${project.emoji} ${project.title}</h2>
        <span class="badge">${project.badge}</span>
      </div>
      ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-img">` : ''}
      <p class="project-summary">${project.summary}</p>
      <div class="project-details">
        ${project.objective ? `
          <div class="detail-block">
            <strong>🎯 Objectif</strong>
            <p>${project.objective}</p>
          </div>` : ''}
        ${project.stack || project.tech ? `
          <div class="detail-block">
            <strong>🛠️ ${project.stack ? 'Stack Technique' : 'Tech'}</strong>
            <p>${project.stack || project.tech}</p>
          </div>` : ''}
        ${linksHtml}
      </div>
    `;

    return article;
  }

  // Charger les projets au démarrage
  loadProjects();

});
