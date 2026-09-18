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
    professional: [
      {
        id: "altair-gestion",
        title: "Plateforme de Gestion Scolaire",
        emoji: "🧩",
        badge: "Stage Altair",
        tags: ["web"],
        summary:
          "Refonte complète d'une application de suivi parents-élèves (Django/React). Migration d'architecture legacy vers moderne.",
        image: "altair.png",
        objective: "Moderniser et sécuriser l'accès aux données scolaires.",
        tech: "Django REST, React.js, PostgreSQL ...",
        links: [
          {
            label: "📄 Rapport (PDF)",
            url: "rpt.pdf",
            download: true
          }
        ]
      },

      {
        id: "access-control",
        title: "Automatisation de porte de garage",
        emoji: "🚪",
        badge: "Automatisme",
        tags: ["automatisme"],
        summary:
          "🚪 Conception d’un système automatisé de commande d’ouverture et de fermeture d’une porte de garage, intégrant des logiques de sécurité et de contrôle.",
        image: "porte.png",
        objective:
          "🎯 Mettre en œuvre une automatisation fiable d’une porte de garage en assurant un fonctionnement sécurisé et cohérent avec les scénarios d’usage.",
        tech:
          "TIA Portal (Siemens), Unity Pro (Schneider), logique câblée et automatisée",
        links: [
          {
            label: "📄 Dossier technique",
            url: "CRautoSAEGUEYE-HAMARI.pdf",
            download: true
          }
        ]
      },

      {
        id: "tri-carrousel",
        title: "Chaîne de Tri Automatisée",
        emoji: "⚙️",
        badge: "Industrie 4.0",
        tags: ["automatisme", "industrie"],
        summary:
          "⚙️ Conception et pilotage d’un système automatisé de tri de pièces cylindriques selon la hauteur, la couleur et la matière, avec supervision via IHM 🖥️.",
        image: "carousel.png",
        objective:
          "🎯 Automatiser et fiabiliser le processus de caractérisation et de tri de pièces industrielles tout en garantissant la sécurité, la répétabilité et la maintenabilité du système.",
        tech:
          "API Siemens S7-1500, IHM KTP700, capteurs capacitifs, inductifs et infrarouges, moteur pas-à-pas, pneumatique",
        links: [
          {
            label: "📄 Dossier technique",
            url: "HAMARI-carousel.pdf",
            download: true
          }
        ]
      },

      {
        id: "ai-ethics",
        title: "Les enjeux de l'Intelligence Artificielle",
        emoji: "🤖⚖️",
        badge: "Rapport académique",
        tags: ["web"],
        summary:
          "Synthèse des enjeux éthiques de l'IA : biais algorithmiques, impacts sociétaux et régulation 🧠⚖️",
        image: "assets/images/ai-ethics-thumb.png",
        objective: "Analyser les défis éthiques et réglementaires de l'IA.",
        tech: "Recherche documentaire, analyse critique",
        links: [
          {
            label: "📄 Télécharger (PDF)",
            url: "lesenjeuxd'artificielle.pdf",
            download: true
          }
        ]
      },

      {
        id: "sae-gestion-robot",
        title: "SAE — Robotique industrielle (KUKA KR6)",
        emoji: "🤖",
        badge: "SAE / Robotique",
        tags: ["robotique", "automatisme", "industrie"],
        summary:
          "🤖 Conception et programmation d’une cellule robotisée autonome assurant le tri automatisé d’écrous selon leur matière (métal / plastique), avec détection, manipulation et dépose alternée.",
        image: "kuka.png",
        objective:
          "🎯 Automatiser un processus de tri industriel en garantissant la sécurité, la précision des trajectoires et une cadence stable, via un robot polyarticulé programmé en langage KRL.",
        tech:
          "Robot KUKA KR6, KRL (KUKA Robot Language), WorkVisual, capteur inductif, capteur laser, aimant, mouvements PTP et LIN_REL"
      },

      {
        id: "projet-capteur",
        title: "Projet CAPTEUR — Compte rendu",
        emoji: "📡📈🌡️",
        badge: "Système embarqué",
        tags: ["iot"],
        summary:
          "Conception d'un nœud de capteurs autonome pour la surveillance en temps réel.📊🔬",
        image: "iot.png",
        objective: "Mettre en œuvre un système d'acquisition de données.",
        tech: "Capteurs, ESP32, MQTT, acquisition de données, analyse",
        links: [
          {
            label: "📄 Compte rendu (PDF)",
            url: "Compte%20Rendu%20du%20Projet%20CAPTEUR.pdf",
            download: true
          }
        ]
      },

      {
        id: "tp-matlab",
        title: "TP MATLAB — FFT & intégration numérique",
        emoji: "📊🧮",
        badge: "Outils Mathématiques",
        tags: ["web"],
        summary: "Génération de signaux, transformée de Fourier, intégration numérique 📈✨",
        image: "matlab-project.png",
        objective: "Maîtriser le traitement du signal numérique.",
        tech: "MATLAB, FFT, intégration/dérivation numérique"
      },

      {
        id: "projet-reseaux",
        title: "Projet Réseaux — Diagnostic & connectivité",
        emoji: "🌐🧰",
        badge: "Réseau",
        tags: ["iot"],
        summary: "Tests de connectivité réseau et diagnostic avec commandes système 🔌📡",
        image: "reseaux.png",
        objective: "Diagnostiquer et résoudre des problèmes réseau.",
        tech: "Ping, commandes réseau, diagnostic"
      },

      {
        id: "app-vbnet",
        title: "Application de gestion scolaire — VB",
        emoji: "🧑🏫🗃️",
        badge: "Projet applicatif",
        tags: ["web"],
        summary: "Gestion scolaire avec authentification multi-rôles et gestion des notes 📚👨🎓",
        image: "vbnet-project.png",
        objective: "Développer une application de gestion complète.",
        tech: "VB.NET, Visual Studio, WinForms, SQL"
      }
    ],

    personal: [

      {
        id: "educateur-uscv",
        title: "Éducateur football — US Crépy-en-Valois",
        emoji: "⚽🧑🏫",
        badge: "Engagement associatif",
        tags: ["management"],
        summary:
          "Encadrement et formation de jeunes joueurs des catégories U8 et U13 au sein de l’US Crépy-en-Valois(60), sur une durée de deux ans.",
        image: "cfi.png",
        objective:
          "Transmettre les bases techniques et collectives du football tout en favorisant la discipline, l’esprit d’équipe et le développement personnel des joueurs.",
        tech:
          "Préparation et animation des séances d’entraînement, organisation des ateliers, accompagnement des équipes lors des matchs et plateaux le week-end",
        links: [
          {
            label: "🎓 Diplôme CFI U6–U9",
            url: "#",
            download: false
          }
        ]
      },

      {
        id: "psc1",
        title: "PSC1 — Prévention et Secours Civiques",
        emoji: "⛑️",
        badge: "Certification",
        tags: ["securite"],
        summary:
          "Certification PSC1 obtenue en 2025, attestant de la capacité à réagir efficacement face à une situation d’urgence.",
        image: "psc1.png",
        objective:
          "Savoir protéger une victime, alerter les secours et réaliser les gestes de premiers secours adaptés.",
        tech:
          "Gestes de premiers secours, protection et alerte, arrêt cardiaque, utilisation du DAE, mise en PLS",
        links: [
          {
            label: "📜 Certificat PSC1",
            url: "#",
            download: false
          }
        ]
      },
         {
  id: "karate-experience",
  title: "Karaté & Karaté-Jujutsu — Ceinture noire (1er dan)",
  emoji: "🥋🏆",
  badge: "Parcours sportif",
  tags: ["sport", "discipline", "competition"],
  summary:
    "Pratique du karaté depuis l’enfance au sein des clubs Bushido Karaté du Valois et l'USC Shotokan Crépy en Valois, avec une progression continue de la catégorie pupille jusqu’à senior et l’obtention de la ceinture noire (1er dan).",
  image: "usckarate.png",
  objective:
    "Développer discipline, rigueur, maîtrise de soi et performance sportive à travers une pratique intensive du karaté et du karaté-jujutsu, en contexte d’entraînement et de compétition.",
  tech:
    "Karaté et karaté-jujutsu, préparation physique et mentale, techniques de combat, gestion du stress en compétition, respect des règles et de l’éthique sportive",
  links: [
    {
      label: "🥋 Ceinture noire – 1er dan",
      url: "#",
      download: false
    }
  ]
}

    ]
  };

  function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const dataset = container.getAttribute('data-projects') || 'professional';
    const list = PROJECTS_DATA[dataset] || [];

    list.forEach(project => {
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
