/* ============================================================
   Belle & Chic – script.js
   ============================================================ */

/* ---------- 1. NAVBAR : scroll & hamburger ---------- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Effet scroll sur la navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Menu hamburger (mobile)
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Fermer le menu en cliquant sur un lien
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- 2. FILTRES PRODUITS ---------- */
const filterBtns   = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Bouton actif
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn .4s ease';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---------- 3. FORMULAIRE DE CONTACT ---------- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation simple
  if (!name || !email || !message) {
    alert('Veuillez remplir tous les champs.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Veuillez entrer un email valide.');
    return;
  }

  // Simuler l'envoi (ici vous pouvez brancher une API réelle)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Envoi en cours...';
  submitBtn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    formSuccess.style.display = 'block';
    submitBtn.textContent = 'Envoyer le message ✈';
    submitBtn.disabled = false;

    // Masquer le message de succès après 5s
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});

/* ---------- 4. ANIMATION AU SCROLL (Intersection Observer) ---------- */
const observerOptions = { threshold: 0.12 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // une seule fois
    }
  });
}, observerOptions);

// Éléments à animer
document.querySelectorAll(
  '.product-card, .why-card, .about-flex, .info-card, .contact-form-wrap'
).forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

/* ---------- 5. CSS animation injectée dynamiquement ---------- */
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity .6s ease, transform .6s ease;
  }
  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(.96); }
    to   { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

/* ---------- 6. SCROLL FLUIDE (fallback navigateurs anciens) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
